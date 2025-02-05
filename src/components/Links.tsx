"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */


import {DDL} from "../lib/DDL";
import React, { useEffect, useState } from "react";
interface Props  {
  href: string;
  title: string;
  class?: string;
}

export function HeaderLink(props: Props) {
  const { href, class: className } = props;
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const subpath = pathname.split("/").slice(1);
  const isActive = href === pathname || href === "/" + (subpath?.[0] || "");

  return (
    <>
      <a href={href} className={isActive ? "active hover:text-black" : "hover:text-black"} >
        {props.title}
      </a>

      <style>
        {`a {
            display: inline-block;
            text-decoration: none;
          }
          a.active {
            font-weight: bolder;
            text-decoration: underline;
            text-decoration-color: var(--primary);
          }`}
      </style>
    </>
  );
}

export function ProfileLink() {

  return ( <>
      <SignedIn>
        <UserButton showName />

      </SignedIn>
      <SignedOut>
          <a href="/login" className="hover:text-primary text-black">Login</a>
      </SignedOut>
    </>
  );
}