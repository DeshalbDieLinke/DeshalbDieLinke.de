"use client";

import { useState } from "react";
import {HeaderLink} from "./Links.tsx";
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";





export default function Header() {
  const [burgerState, setBurgerState] = useState(false);
  const css = `
	header {
		height: 3.5rem;
		margin: 0;
		padding: 0 1em;
		background: white;
		box-shadow: 0 2px 8px rgba(var(--black), 5%);
	}
	h2 {
		margin: 0;
		font-size: 1em;
	}

	h2 a,
	h2 a.active {
		text-decoration: none;
	}
	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	nav a {
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		color: var(--black);
		text-decoration: none;
	}
	nav a.active {
		border-bottom:4px solid var(--primary);
		text-decoration: none;		
	}

    /*.social-links,
	.social-links a {
		display: flex;
	}
	@media (min-width: 720px) {
		.social-links {
			display: none;
		}
    }*/
	`;

  const links = <><HeaderLink
  href="/"
  title="Home"
></HeaderLink>
<HeaderLink
  href="/faq"
  title="FAQ"
></HeaderLink>
<HeaderLink
  href="/material"
  title="Material"
></HeaderLink>
<details className="dropdown">
  <summary className="m-1 text-black hover:cursor-pointer"> Konto </summary>
  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <SignedOut>
     <li> <SignInButton /></li>
     <li> <SignUpButton /></li>
    </SignedOut>
    
    <SignedIn>
      <li><a href="/upload">Hochladen</a></li>
      <li><Link href="/profile">Profil</Link></li>
      <li><SignOutButton /></li>
    </SignedIn>
  </ul>
  
</details>
<UserButton  />

</>;

  return (
    <>
      <style>{css}</style>
      <header className="sticky top-0 bg-white h-[3.5rem] z-50">
        <nav className="h-full">
          <div className="items-center space-x-2 pl-0 w-[20%] h-full rounded-none">
              <Link href="/" className="w-full h-full rounded-none">
                  <img className="w-32 h-32 rounded-none top-10 left-10 absolute" src="/images/logos/DDL-Logo.svg" alt="Logo" />
              </Link>
          </div>
          
          <div className="internal-links lg:block p-[1.1rem] hidden">
          {links} 
          
          </div>

          {/* Open Burger Links */}
          {burgerState && (
            <div className="absolute right-[0] top-[10%] bg-white">
              <ul className="bg-grey-background rounded w-56 flex flex-col [&>*]:py-1 ">
                {links}
              </ul>
            </div>
          ) } {burgerState && (<div className="w-screen h-screen lg:hidden" onClick={()=> {
            setBurgerState(false);
          }}></div>)}
          <div className="social-links top-0 right-0 absolute lg:hidden bg-white">
            <button onClick={() => setBurgerState(!burgerState)}>
              <svg
                className="w-10 m-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 18L20 18"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 12L20 12"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 6L20 6"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        <div className="lg:block hidden"></div>
        </nav>
      </header>
    </>
  );
}
