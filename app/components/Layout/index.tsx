import React from 'react';
import { NavLink } from '@remix-run/react';
import classnames from 'classnames';

const Links = [
  { name: 'Home', href: '/' },
  { name: 'Docs', href: '/docs' },
];

export const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div>
      <div className="sticky top-0 z-20">
        <div className="relative bg-white text-black">
          <div className="container m-auto px-4">
            <div className="relative z-20 flex h-16 w-full items-center justify-between py-3">
              <div className="flex w-full items-center justify-between gap-8 md:w-auto">
                <a className="flex" href="/">
                  <span className="logo">ρV</span>
                </a>
              </div>
              <div className="flex gap-8">
                <div className="flex items-center">
                  {Links.map((link, index) => {
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

                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/remix-run/remix"
                    className="h-10 w-10 place-items-center text-black hover:text-gray-600 grid"
                    title="View code on GitHub"
                  >
                    <span className="sr-only">View code on GitHub</span>
                    <img
                      src="/images/github-mark/github-mark.png"
                      alt=""
                      style={{
                        width: '24px',
                        height: '24px',
                      }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="container m-auto p-4 my-8 rounded bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};
