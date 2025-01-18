import type { HTMLAttributes } from "astro/types";

interface Props extends HTMLAttributes<"a"> {
  pathname: string;
  subpath: any;
  href: string;
  title: string;
}

export default function HeaderLink(props: Props) {
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
