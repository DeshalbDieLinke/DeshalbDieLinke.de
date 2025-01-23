import { useState } from "react";
import HeaderLink from "./HeaderLink.tsx";
import { SITE_TITLE } from "../consts";

export default function Header(props: { pathname: string; subpath: any }) {
  var [burgerState, setBurgerState] = useState(false);
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

  let links = <><HeaderLink
  pathname={props.pathname}
  subpath={props.subpath}
  href="/"
  title="Home"
></HeaderLink>
<HeaderLink
  pathname={props.pathname}
  subpath={props.subpath}
  href="/FAQ"
  title="FAQ"
></HeaderLink>
<HeaderLink
  pathname={props.pathname}
  subpath={props.subpath}
  href="/Material"
  title="Material"
></HeaderLink>
<HeaderLink
  pathname={props.pathname}
  subpath={props.subpath}
  href="/profile"
  title="Profil"
></HeaderLink></>;

  return (
    <>
      <style>{css}</style>
      <header className="z-10 h-[3.5rem] sticky top-0 bg-white">
        <nav>
          <div className="flex items-center space-x-2 pl-0">
              <a href="/" className="flex items-center">
                  <img className="scale-150 md:fixed absolute h-[2.8rem] top-10 left-10 rounded-none" src="/images/logos/DDL-Logo.svg" alt="Logo" />
              </a>
          </div>
          
          <div className="internal-links lg:block p-[1.1rem] hidden">
          {links} 
          </div>

          {/* Open Burger Links */}
          {burgerState && (
            <div className="absolute right-[0] top-[10%] ">
              <ul className="bg-grey-background rounded w-56 flex flex-col [&>*]:py-1 ">
                {links}
              </ul>
            </div>
          ) } {burgerState && (<div className="w-screen h-screen lg:hidden" onClick={()=> {
            setBurgerState(false);
          }}></div>)}
          <div className="social-links top-0 right-0 absolute lg:hidden">
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
