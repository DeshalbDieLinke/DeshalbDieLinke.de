import {DDL} from "@/utils/DDL";
import type { HTMLAttributes } from "astro/types";
import React from "react";

interface Props extends HTMLAttributes<"a"> {
  pathname: string;
  subpath: any;
  href: string;
  title: string;
}

export function HeaderLink(props: Props) {
  const { href, class: className } = props;
  const pathname = props.pathname;
  const subpath = props.subpath;
  const isActive = href === pathname || href === "/" + (subpath?.[0] || "");
  console.log("isActive", isActive, href, pathname, subpath);

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
  const [id, setId] = React.useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
          DDL.getAuthStatus(
            (user) => {
              if (user) {
                setId(user.ID)
                setIsLoggedIn(true)
              } else {
                setId(null)
                setIsLoggedIn(false)
              }
            }
          )

      }, [])

  return (
    <>{isLoggedIn ? <a href={`/profile/${id}`} className="hover:text-primary text-black">Profil</a> 
    : <a href="/login" className="hover:text-primary text-black">Login</a>}

    </>
  );
}