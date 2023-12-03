import React from 'react';
import type { MetaFunction } from '@vercel/remix';

export const meta: MetaFunction = () => {
  return [
    { title: 'Links - ρV' },
    {
      name: 'description',
      content: 'undefined project - ρV',
    },
  ];
};

const LinkIndex: React.FC = () => {
  return (
    <div className="links-index">
      <div className="links-header border-b border-gray-100 pb-4">
        <h1>Links</h1>
      </div>
      <div className="links-content py-4">coming soon.</div>
    </div>
  );
};

export default LinkIndex;
