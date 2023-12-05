import React from 'react';
import { Flowbite } from 'flowbite-react';
import { Header } from '~/components/Header';
import { customTheme } from '~/theme';

export const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div>
        <Header />

        <div className="flex flex-col">
          <div className="container m-auto p-4 my-8 rounded bg-white">
            {children}
          </div>
        </div>
      </div>
    </Flowbite>
  );
};
