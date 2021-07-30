import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MovieList.css";
import Header from "./Header";
import MovieListHeader from "./MovieListHeader";

export default function MovieList() {
  const [Movie, setMovie] = useState([]);
  const [search, setSearch] = useState("avengers");
  const [favourites, setFavourites] = useState([]);

  const getMovie = async (search) => {

//    const url =  axios.get("https://www.omdbapi.com/?s=avengers&apikey=8717385c")
    const url = `https://www.omdbapi.com/?s=${search}&apikey=8717385c`;
    const response = await fetch(url);
    const responseJson = await response.json();
    // console.log(responseJson);
    if (responseJson.Search) {
      setMovie(responseJson.Search);
    }
  };
  useEffect( () => {
    getMovie(search);

  }, [search]);


  const addFavourite = (movie) => {
    const newFavourite = [...favourites,movie];
    setFavourites(newFavourite);
    // addFavourite(favourites);
    // axios.post("/favourite", favourites);
  }
  return (
    <div>
      <MovieListHeader search={search} setSearch={setSearch} />
      <div className="container">
        {Movie.map((item, index) => {
          return (
            <div className="movie">
              <img src={item.Poster} alt={item.Title} />
              <div className="movie-info">
                <h6>{item.Title}</h6>
                {/* {user ? 
                <button onClick={() => addFavourite(item)}><i class="far fa-heart"></i></button>
                : null} */}
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
}
