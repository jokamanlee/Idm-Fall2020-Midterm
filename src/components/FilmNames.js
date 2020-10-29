import React from "react";

import { Link } from "react-router-dom";

function FilmNames({ filmInfo }) {
  return (
    <Link className="filmTitles" to={`/film/${filmInfo.title}`}>
      | {filmInfo.title} |
    </Link>
  );
}

export default FilmNames;
