import React, { useContext, useEffect, useState } from "react";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import axios from "axios";
import "./MovieList.css";
import Header from "./Header";
import { ToggleButton } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../context/userContext";

export default function MovieList() {

  const [Movie, setMovie] = useState([]);
  const [search, setSearch] = useState("avengers");
  const [checked, setChecked] = useState(false);

  const currentUser = useContext(UserContext);
  const { isLoggedIn,favourite } = currentUser;

  const history = useHistory();
  const getMovie = async (search) => {

    const url = `https://www.omdbapi.com/?s=${search}&apikey=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);
    const responseJson = await response.json();
 
    if (responseJson.Search) {
      setMovie(responseJson.Search);
    }
  };
  useEffect(() => {
    getMovie(search);
    addFavouriteHandle()
    axios.post('/favourite')
  }, [search]);

  const { addFavourite } = currentUser;
  function addFavouriteHandle(Poster,imdbID,Title,) {
    const movie = {
         imdbID,
         Title,
         Poster
    }
    console.log(movie);
    addFavourite(movie);
  }

  // const addFavourite = (movie) => {
  //   const newFavourite = [...favourites,movie];
  //   setFavourites(newFavourite);
  //   // addFavourite(favourites);
  //   // axios.post("/favourite", favourites);
  // }

  return (
    <div>
      <Header search={search} setSearch={setSearch}  favouriteLen={favourite.length} />
      <div className="container">
        {Movie.map((item, index) => {
          return (
            <div className="movie">
              <Link to={`/movie/${item.imdbID}`}>
                <img src={item.Poster} alt={item.Title} />
              </Link>
              <div className="movie-info">
                <h6>{item.Title}</h6>
                {/* <ToggleButton
        className="mb-2"
        id="toggle-check"
        type="checkbox"
        variant="outline-primary"
        checked={checked}
        value="1"
        onClick={() => addFavourite(item)}
        onChange={(e) => setChecked(e.currentTarget.checked)}
      >
        Checked
      </ToggleButton> */}
                {isLoggedIn === true ? (
                  <button onClick={() => addFavouriteHandle(item.Poster,item.imdbID,item.Title)}>
                    Add to
                  </button>
                ) : null}
                {/* {favourites.includes(i) ? 
     <IoIosHeart onClick={(item,i) => addFavourite(item,i)} style={{color:'red'}}> </IoIosHeart>
    :
    <IoIosHeartEmpty>

    </IoIosHeartEmpty>
    }  */}

                {/* <button onClick={() => addFavourite(item)}><i class="far fa-heart"></i></button> */}
                {/* : null */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
