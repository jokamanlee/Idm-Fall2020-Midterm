import React, { useMemo } from "react";

import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

function Header() {
  let { title } = useParams();

  const color = useMemo(() => {
    switch (true) {
      case title == undefined:
        return "rgb(0, 0, 0)";
      default:
        return "rgb(255, 255, 255)";
    }
  });
  return (
    <header className="heading">
      <h1>
        <Link className="homePage" to="/" style={{ color: color }}>
          スタジオジブブリ作品
        </Link>
      </h1>
      <h1>
        <Link className="homePage" to="/" style={{ color: color }}>
          STUDIO GHIBLI
        </Link>
      </h1>
    </header>
  );
}

export default Header;
