import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="heading">
      <h1>
        <Link className="homePage" to="/">
          スタジオジブブリ作品
        </Link>
      </h1>
      <h1>
        <Link className="homePage" to="/">
          STUDIO GHIBLI
        </Link>
      </h1>
    </header>
  );
}

export default Header;
