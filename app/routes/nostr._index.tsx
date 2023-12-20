import React, { useState, useEffect, useCallback } from 'react';
import {
  initLogger,
  loadWasmAsync,
  Keys,
  Client,
  PublicKey,
  EventBuilder,
  Filter,
  Timestamp,
  Event,
  nip04_decrypt,
} from '@rust-nostr/nostr-sdk';
import type { MetaFunction } from '@vercel/remix';
import { Button } from 'flowbite-react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Nostr - ρV' },
    {
      name: 'description',
      content: 'undefined project - ρV',
    },
  ];
};

const NOSRT_ASSETS_NPUB_KEY =
  'npub1dy7n73dcrs0n24ec87u4tuagevkpjnzyl7aput69vmn8saemgnuq0a4n6y';

const NostrIndex: React.FC = () => {
  // page
  const [loaded, setLoaded] = useState(false);

  // nostr
  const [keys, setKeys] = useState<Keys>();
  const [client, setClient] = useState<Client>();
  const [connected, setConnected] = useState(false);

  // init
  useEffect(() => {
    if (!loaded) {
      return;
    }

    const init = async () => {
      await loadWasmAsync();
      initLogger();

      const keys = Keys.generate();
      console.log('keys', keys);
      setKeys(keys);

      const client = new Client(keys);
      setClient(client);
      console.log('client', client);

      await client.addRelay('wss://relay.nostrassets.com');
      await client.connect();
      setConnected(true);
    };

    init();

    return () => {
      setKeys(undefined);
      setClient(undefined);
      setConnected(false);
    };
  }, [loaded]);

  // subscribe
  useEffect(() => {
    if (!keys || !client || !connected) {
      return;
    }

    const handleEvent = (relayUrl: string, event: Event) => {      
      console.log('relayUrl', relayUrl);
      console.log('event', event);

      if (event.kind == BigInt(4)) {
        try {
          const content = nip04_decrypt(
            keys.secretKey,
            event.pubkey,
            event.content
          );
          console.log('message:', content);
        } catch (error) {
          console.log('Impossible to decrypt DM:', error);
        }
      }
    };

    const subscribe = async () => {
      const filter = new Filter()
        .pubkey(keys.publicKey)
        .kind(BigInt(4))
        .since(Timestamp.now());
      console.log('filter', filter, filter.asJson());

      await client.subscribe([filter]);
      await client.handleEventNotifications(handleEvent);
    };

    subscribe();

    return () => {
      client.unsubscribe().then(() => {
        console.log('unsubscribe.');
      });
    };
  }, [keys, client, connected]);

  // load
  useEffect(() => {
    if (loaded) {
      return;
    }

    setLoaded(true);

    return () => {
      setLoaded(false);
    };
  }, []);

  // query
  const query = useCallback(async () => {
    if (!client || !keys) {
      return;
    }

    let public_key = PublicKey.fromBech32(NOSRT_ASSETS_NPUB_KEY);
    let event = EventBuilder.newEncryptedDirectMsg(
      keys,
      public_key,
      'balance'
    ).toEvent(keys);

    console.log('event', event);    
    await client.sendEvent(event);
  }, [keys, client]);

  return (
    <div className="links-index">
      <div className="links-header border-b border-gray-100 pb-4">
        <h1>Nostr</h1>
      </div>
      <div className="links-content py-4">
        <div>
          <Button
            onClick={() => {
              query();
            }}
          >
            Query Balance
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NostrIndex;
