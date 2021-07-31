import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import "./Movie.css";

export default function Movie() {
  const { id } = useParams();
  const [Movie, setMovie] = useState("");

  useEffect(() => {
    getMovie(id);
  }, [id]);
  const getMovie = async () => {
    console.log(id);
    const url = `https://www.omdbapi.com/?i=${id}&apikey=8717385c`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson) {
      setMovie(responseJson);
    }
  };
  return (
    <div>
      <Header />

      <div className="movie">
        <div>{Movie.Title}</div>
        <div>
          <img src={Movie.Poster} alt={Movie.Title} />
        </div>
        <div>{Movie.Year}</div>
        <div>{Movie.Type}</div>
        <div>{Movie.imdbRating}</div>
        <div>{Movie.Released}</div>
        <div>{Movie.Genre}</div>
        <div>{Movie.Plot}</div>
        <div>{Movie.BoxOffice}</div>
        <div>{Movie.Actors}</div>
        <div>{Movie.Language}</div>
      </div>
    </div>
  );
}
