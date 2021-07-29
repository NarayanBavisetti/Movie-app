import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Favourite from "./Favourite";
import Header from "./Header";
import Login from "./Login";
import MovieList from "./MovieList";
import SignUp from "./SignUp";

export default function Main() {
  return (
      <div>

    <Router>
            <Header />
      <Route exact path="/" component={MovieList} />
      <Route exact path="/favourite" component={Favourite} />
      <Route exact path="/login" component={Login} />
      <Route exact path ="/register" component={SignUp} />
    </Router>
    </div>
  );
}
