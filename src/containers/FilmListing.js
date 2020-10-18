import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Header from "../components/Header";

import FilmNames from "../components/FilmNames";

const gifKey = `ud0TA4TXBTiRM4P5aqjg7g9tj8oPMder`;

function FilmListing() {
  const [isLoading, setLoading] = useState(true);
  const [filmsData, setfilmData] = useState();

  useEffect(() => {
    axios
      .get(`https://ghibliapi.herokuapp.com/films`)
      .then(function (response) {
        const film = response.data;
        setfilmData(film);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <main>
        <div>
          {filmsData.map((films, index) => (
            <FilmNames key={index} filmInfo={films} />
          ))}
        </div>
      </main>
    </>
  );
}
export default FilmListing;
