import React from "react";
import Main from "./components/MainComponent";
import {BrowserRouter} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./app.css"
function App() {
  return(
  <BrowserRouter>
    <Main />
  </BrowserRouter>
  )
}

export default App;
