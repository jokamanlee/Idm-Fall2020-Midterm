import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

import Header from "../components/Header";

import DataOffsets from "../components/DataLinks";

const API_KEY_GIF = process.env.REACT_APP_API_KEY;

function Films() {
  const [isLoading, setLoading] = useState(true);
  const [gifData, setGifData] = useState(null);
  const [filmsData, setfilmData] = useState();

  let { title } = useParams();

  const titlelink = DataOffsets.find((film) => film.title === title);
  const titleid = DataOffsets.find((film) => film.title === title);

  useEffect(() => {
    axios
      .get(
        `https://api.giphy.com/v1/gifs/${titlelink.link}?api_key=${API_KEY_GIF}`
      )
      .then(function (response) {
        const gifData = response.data;
        setGifData(gifData);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
  console.log(filmsData);
  const { summary, director, producer, yearOfRelease } = useMemo(() => {
    let summary = "";
    let director = "";
    let producer = "";
    let yearOfRelease = "";

    if (filmsData) {
      summary = `${filmsData[`${titleid.id}`].description}`;
      director = `${filmsData[`${titleid.id}`].director}`;
      producer = `${filmsData[`${titleid.id}`].producer}`;
      yearOfRelease = `${filmsData[`${titleid.id}`].release_date}`;
    }

    return {
      summary,
      director,
      producer,
      yearOfRelease,
    };
  }, [filmsData]);

  const { noGifAvalible } = useMemo(() => {
    let noGifAvalible = "";

    if (titleid.id === "9" || titleid.id === "18") {
      noGifAvalible = "*Not this film's related gif";
    }

    return {
      noGifAvalible,
    };
  }, [titleid]);
  console.log(noGifAvalible);
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
      <main className="filmPage">
        <div className="filmInfo">
          <h1>
            {title}-{yearOfRelease}
          </h1>
          <img src={gifImage} />
          <div className="gif">{noGifAvalible}</div>
        </div>
        <div className="filmInfo">
          <h2>Director: {director}</h2>
          <h2>Producer: {producer}</h2>
          <h2>Summary</h2>
          <p>{summary}</p>
        </div>
      </main>
    </>
  );
}

export default Films;
