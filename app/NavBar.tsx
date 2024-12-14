"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoMdImages } from "react-icons/io";
import LoginCardButton from "./components/LoginCardButton";
// import classNames from "classnames";
// import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";

interface link {
  label: string;
  href: string;
}

const NavBar = () => {
  const currentPath = usePathname();

  // const links: link[] = [
  //   { label: "Home", href: "/" },
  //   { label: "Gallery", href: "/gallery" },
  // ];
  // return (
  //   <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
  //     <Link href="/">
  //       <IoMdImages size={32} />
  //     </Link>
  //     <ul className="flex space-x-6">
  //       {links.map((link) => (
  //         <Link
  //           key={link.href}
  //           href={link.href}
  //           className={classNames({
  //             "text-zinc-600": link.href !== currentPath,
  //             "text-zinc-300": link.href === currentPath,
  //             "hover:text-zinc-400 transition-colors": true,
  //           })}
  //         >
  //           {link.label}
  //         </Link>
  //       ))}
  //     </ul>
  //   </nav>
  // );

  return (
    <nav className="flex justify-between border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <IoMdImages size={32} />
      </Link>
      <LoginCardButton />
    </nav>
  );
};

export default NavBar;
