import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import Favourite from "./Favourite";
import Login from "./Login";
import Movie from "./Movie";
import MovieList from "./MovieList";
import SignUp from "./SignUp";

export default function Main() {
  
  return (
      <div>

    <Router>
      <Route exact path="/" component={MovieList} />
      <Route exact path="/movie/:id" component={Movie} />
      <PrivateRoute exact path="/favourite" component={Favourite} />
      <Route exact path="/login" component={Login} />
      <Route exact path ="/register" component={SignUp} />
    </Router>
    </div>
  );
}
