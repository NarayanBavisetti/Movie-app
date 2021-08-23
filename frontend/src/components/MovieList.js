import React, { useContext, useEffect, useState } from "react";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import axios from "axios";
import "./MovieList.css";
import Header from "./Header";
import { ToggleButton } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../context/userContext";
import Aos from "aos"
import "aos/dist/aos.css"

export default function MovieList() {

  useEffect(() => {
    Aos.init({duration :2000});
  },[])

  const [Movie, setMovie] = useState([]);
  const [search, setSearch] = useState("avengers");
  const [checked, setChecked] = useState(false);

  const currentUser = useContext(UserContext);
  const { isLoggedIn, favourite } = currentUser;

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
    addFavouriteHandle();
    axios.post("/favourite");
  }, [search]);

  const { addFavourite } = currentUser;
  function addFavouriteHandle(Poster, imdbID, Title, id) {
    const movie = {
      id,
      imdbID,
      Title,
      Poster,
    };
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
      <Header
        search={search}
        setSearch={setSearch}
        favouriteLen={favourite.length}
      />
      <div className="container">
        {/* {favourite.map((val) => {
          return (
            <> */}
            {console.log(favourite)}
              {Movie.map((item, index) => {
                console.log(item)
                return (
                  <div data-aos="fade-up" className="movie">
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
                      {/* {isLoggedIn === true ? (
                  <>
                    {console.log(item._id)}
                    <button
                      onClick={() =>
                        addFavouriteHandle(
                          item.Poster,
                          item.imdbID,
                          item.Title,
                          item._id
                        )
                      }
                    >
                      Add to
                    </button>
                  </>
                ) : null} */}

                      {console.log(favourite.imdbID)}
                      {console.log(item.imdbID)}
                      {favourite.imdbID == item.imdbID ? (
                        <button>hi</button>
                      ) : (
                        <button>no</button>
                      )}

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
            {/* </>
          );
        })} */}
      </div>
    </div>
  );
}
