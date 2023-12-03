import React from 'react';

import { Header } from '~/components/Header';

export const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div>
      <Header />

      <div className="flex flex-col">
        <div className="container m-auto p-4 my-8 rounded bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};
