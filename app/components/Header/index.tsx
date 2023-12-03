import React from 'react';
import { NavLink } from '@remix-run/react';
import classnames from 'classnames';

const NavLinks = [
  { name: 'Home', href: '/' },
  { name: 'Docs', href: '/docs' },
  { name: 'Links', href: '/links' },
];

const ExtLinks = [
  {
    name: 'Github',
    href: 'https://github.com/thonatos/pV-remix',
    icon: '/images/github-mark/github-mark.png',
  },
];

const NavLogo = () => {
  return (
    <div className="flex w-full items-center justify-between gap-8 md:w-auto">
      <a className="flex" href="/">
        <span className="logo">ρV</span>
      </a>
    </div>
  );
};

const NavMain = () => {
  return (
    <div className="flex gap-8">
      {/* nav links */}
      <div className="flex items-center">
        {NavLinks.map((link, index) => {
          return (
            <NavLink
              key={index}
              to={link.href}
              className={({ isActive }) =>
                classnames(
                  `p-2 py-2.5 text-sm underline-offset-8 hover:underline text-gray-500 decoration-gray-200`,
                  {
                    underline: isActive,
                  }
                )
              }
            >
              {link.name}
            </NavLink>
          );
        })}
      </div>

      {/* ext links */}
      <div className="flex items-center gap-2">
        {ExtLinks.map((link, index) => {
          return (
            <a
              key={index}
              href={link.href}
              className="h-10 w-10 place-items-center text-black hover:text-gray-600 grid"
              title={link.name}
            >
              <span className="sr-only">{link.name}</span>
              <img
                src={link.icon}
                alt=""
                style={{
                  width: '24px',
                  height: '24px',
                }}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export const Header: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="sticky top-0 z-20">
      <div className="relative bg-white text-black">
        <div className="container m-auto px-4">
          <div className="relative z-20 flex h-16 w-full items-center justify-between py-3">
            <NavLogo />
            <NavMain />
          </div>
        </div>
      </div>
    </div>
  );
};