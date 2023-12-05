import { cssBundleHref } from '@remix-run/css-bundle';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { ThemeModeScript } from 'flowbite-react';
import { Analytics } from '@vercel/analytics/react';
import type { LinksFunction } from '@vercel/remix';

import styles from './tailwind.css';

export const links: LinksFunction = () => {
  const defaultLinks = [
    { rel: 'stylesheet', href: styles },
    {
      rel: 'icon',
      href: '//s.implements.io/a/f/favicon.png',
      type: 'image/png',
    },
  ];

  return [
    ...(cssBundleHref
      ? [{ rel: 'stylesheet', href: cssBundleHref }, ...defaultLinks]
      : defaultLinks),
  ];
};

export default function App() {
  return (
    <html lang="en" className="scroll-pt-4">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ThemeModeScript />
      </head>
      <body className="min-h-screen w-full overflow-x-hidden antialiased bg-gray-100 text-gray-900">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Analytics />
      </body>
    </html>
  );
}
