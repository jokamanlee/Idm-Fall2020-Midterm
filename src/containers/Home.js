import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

import Header from "../components/Header";

const gifKey = `ud0TA4TXBTiRM4P5aqjg7g9tj8oPMder`;

function Home() {
  const [movieData, setMovieData] = useState(null);
  const [gifData, setGifData] = useState(null);
  useEffect(() => {
    axios
      .get(`https://ghibliapi.herokuapp.com/films`)
      .then(function (response) {
        const movie = response.data;
        setMovieData(movie);

        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://api.giphy.com/v1/gifs/translate?api_key=${gifKey}&s=${"spirited+away"}`
      )
      .then(function (response) {
        const gifData = response.data;
        setGifData(gifData);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const { movieTitle } = useMemo(() => {
    let movieTitle = "";

    if (movieData) {
      movieTitle = `${movieData[10].title}`;
    }

    return {
      movieTitle,
    };
  });
  const { gifImage } = useMemo(() => {
    let gifImage = "";

    if (gifData) {
      gifImage = `${gifData.data.images.original.url}`;
    }
    return {
      gifImage,
    };
  });

  return (
    <>
      <Header />
      <main>
        <h2>{movieTitle}</h2>
        <p>Basic Info</p>
        <img src={gifImage} />
      </main>
    </>
  );
}

export default Home;
