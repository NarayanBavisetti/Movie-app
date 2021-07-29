import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MovieList.css";

export default function MovieList() {
  const [Movie, setMovie] = useState([]);
  const [search, setSearch] = useState("");

  const getMovie = async (search) => {

//    const url =  axios.get("https://www.omdbapi.com/?s=avengers&apikey=8717385c")
    const url = `https://www.omdbapi.com/?s=avengers&apikey=8717385c`;
    const response = await fetch(url);
    const responseJson = await response.json();
    // console.log(responseJson);
    if (responseJson.Search) {
      setMovie(responseJson.Search);
    }
  };
  useEffect(() => {
    getMovie(search);
  }, [search]);
  return (
    <div>
      {/* <Header search={search} setSearch={setSearch} /> */}
      <div className="container">
        {Movie.map((item, index) => {
          return (
            <div className="movie">
              <img src={item.Poster} alt={item.Title} />
              <div className="movie-info">
                <h6>{item.Title}</h6>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
