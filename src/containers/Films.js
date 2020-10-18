import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

import Header from "../components/Header";

import DataOffsets from "../components/DataLinks";

import FilmListing from "./FilmListing";
import { filmsData } from "./FilmListing";

const gifKey = `ud0TA4TXBTiRM4P5aqjg7g9tj8oPMder`;

function Films() {
  const [isLoading, setLoading] = useState(true);
  const [gifData, setGifData] = useState(null);

  let { title } = useParams();

  const titlelink = DataOffsets.find((film) => film.title === title);

  const filmTitle = `${title} Ghibli `;

  useEffect(() => {
    axios
      .get(
        `https://api.giphy.com/v1/gifs/${titlelink.link}?api_key=ud0TA4TXBTiRM4P5aqjg7g9tj8oPMder`
      )
      .then(function (response) {
        const gifData = response.data;
        setGifData(gifData);
        setLoading(false);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const { gifImage } = useMemo(() => {
    let gifImage = "";

    if (gifData) {
      gifImage = `${gifData.data.images.original.url}`;
    }
    return {
      gifImage,
    };
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Header />
      <main>
        <p>Basic Info</p>
        <img src={gifImage} />
      </main>
    </>
  );
}

export default Films;
