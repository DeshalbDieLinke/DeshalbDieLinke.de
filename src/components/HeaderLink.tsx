import getAuthStatus from "@/utils/getAuthStatus";
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

export function HeaderLinkProfile(props: Props) {
  const [href, setHref] = React.useState(props.href);
  const pathname = props.pathname;
  const subpath = props.subpath;
  const isActive = href === pathname || href === "/" + (subpath?.[0] || "");
  console.log("isActive", isActive, href, pathname, subpath);

  React.useEffect(() => {
          getAuthStatus(
            (user) => {
              if (user) {
                const targetStr = "/profile?id=" + user.ID
                setHref(targetStr)
              } else {
                setHref("/login")
              }
            }
          )
          console.log("User gotten: ", href)

      }, [])

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