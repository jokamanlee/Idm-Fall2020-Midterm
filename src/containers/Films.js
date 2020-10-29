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
      noGifAvalible = "*GIF NOT RELATED TO FILM*";
    }

    return {
      noGifAvalible,
    };
  }, [titleid]);

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
      <div className="page">
        <Header />
        <main className="filmPage">
          <div className="filmInfo">
            <h1 className="labelTitle">
              {title}-{yearOfRelease}
            </h1>
            <img src={gifImage} />
            <div className="gif">{noGifAvalible}</div>
            <h2 className="labels">Director:</h2>
            <p className="text">{director}</p>
            <h2 className="labels">Producer:</h2>
            <p className="text">{producer}</p>
            <h2 className="labels">Summary</h2>
            <p className="text">{summary}</p>
          </div>
        </main>
      </div>
    </>
  );
}

export default Films;
