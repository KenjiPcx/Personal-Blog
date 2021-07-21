import React from "react";
import Link from "next/Link";

function NavHeader() {
  return (
    <div className={"navHeader"}>
      <nav className={"nav"}>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/posts">
          <a>Posts</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
      <nav className={"nav"}>
        <Link href="/instagram">
          <a>Instagram</a>
        </Link>
        <Link href="/twitter">
          <a>Twitter</a>
        </Link>
        <Link href="/linkedin">
          <a>Linkedin</a>
        </Link>
      </nav>
    </div>
  );
}

export default NavHeader;
