import React, { useState, useEffect } from "react";
import {  Button } from "react-bootstrap";
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
    const url = `https://www.omdbapi.com/?i=${id}&apikey=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson) {
      setMovie(responseJson);
    }
  };

  return (
    <div>
      <Header />
      <div className="app">
        <div className="details">
          <div className="big-img">
            <img src={Movie.Poster} alt="" />
          </div>
          <div className="box">
            <div className="row">
              <h4>
                {Movie.Title}
                <h6>
                  <i class="fas fa-star" style={{ color: "yellow" }}></i>
                  {Movie.imdbRating}/10
                </h6>
              </h4>

              <span>
                {Movie.Year}
                <i></i> {Movie.BoxOffice}
              </span>
            </div>
            <p>
              <button className="cart">{Movie.Type}</button>
              <Button variant="outline-primary">{Movie.Genre}</Button>
            </p>
            <p>{Movie.Plot}</p>
            <hr></hr>
            <p>
              <strong style={{ color: "#38b000" }}>
                Director&nbsp;&nbsp;{" "}
              </strong>{" "}
              {"       "}
              {Movie.Director}
            </p>
            <hr></hr>
            <p>
              <strong style={{ color: "#38b000" }}>Actors &nbsp;&nbsp; </strong>{" "}
              {"       "}
              {Movie.Actors}
            </p>
            <hr></hr>
            <p>
              <strong style={{ color: "#38b000" }}>
                Languages&nbsp;&nbsp;{" "}
              </strong>{" "}
              {"       "}
              {Movie.Language}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
