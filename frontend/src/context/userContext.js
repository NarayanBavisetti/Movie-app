import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();
export default UserContext;

export function UserContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);

  const [favourite, setFavourite] = useState([]);
  async function getLoggedIn() {
    const res = await axios.get("/loggedIn");
    console.log(res.data);
    setIsLoggedIn(res.data);
  }

  async function getFavourite() {
    const res = await axios.get("/favourite");
    setFavourite(res.data);
  }
  useEffect(() => {
    getLoggedIn();
    if (isLoggedIn === true) {
      getFavourite();
    }
  },[isLoggedIn]);
  async function addFavourite(movie) {
    try {
      if(movie.imdbID !== undefined){
      setFavourite((prevFav) => {
        return prevFav.concat(movie);
      });
      await axios.post("/favourite/add", { imdbID:movie.imdbID ,Title:movie.Title,Poster:movie.Poster});
      console.log("product added sucessfully");
    }
    } catch (e) {
      console.log(e);
    }
  }
  const context = {
    isLoggedIn: isLoggedIn,
    getLoggedIn: getLoggedIn,
    favourite: favourite,
    addFavourite: addFavourite,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}
