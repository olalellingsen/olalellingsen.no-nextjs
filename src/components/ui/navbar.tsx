"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const [menuItems, setMenuItems] = useState([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Discography", path: "/discography" },
    { name: "Concerts", path: "/concerts" },
  ]);

  return (
    <nav className="min-h-16">
      <Link
        href="/"
        className="absolute top-2 left-2 md:top-4 md:left-4 transition-all duration-200"
      >
        <div className="hover:cursor-pointer">
          <h1 className={`hidden sm:flex`}>Ola Lømo Ellingsen</h1>
          <h2 className="sm:hidden">Ola Lømo Ellingsen</h2>
          <h3>Trumpet player | Composer</h3>
        </div>
      </Link>
      <Menu
        size="48"
        strokeWidth={0.5}
        onClick={() => setIsOpen(true)}
        className="absolute cursor-pointer right-1 top-3 md:m-3 lg:hidden"
      />

      {isOpen && (
        <div className="lg:hidden absolute right-0 top-0 bg-background z-10 h-screen w-screen p-2 text-4xl">
          <X
            size="48"
            strokeWidth={0.5}
            onClick={() => setIsOpen(false)}
            className="absolute cursor-pointer right-1 top-3 md:m-3"
          />
          <ul className="p-10 grid gap-y-4">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className="hover:text-gray-500 dark:hover:text-gray-400"
              >
                <Link href={item.path} onClick={() => setIsOpen(false)}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <ul className="hidden lg:flex justify-end space-x-10 p-8 text-xl *:hover:text-gray-500 *:dark:hover:text-gray-400">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
