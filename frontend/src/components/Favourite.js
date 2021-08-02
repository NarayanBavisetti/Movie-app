import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { Button, Col, Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/userContext";
import "./Favourite.css";

export default function Favourite() {
  const currentUser = useContext(UserContext);
  const { favourite } = currentUser;
  const [cart, setCart] = useState([]);
  const [movie, setMovie] = useState("");
  const history = useHistory();
  const callHomePage = async () => {
    // try {
    const res = await axios.get("/favourite");
    setCart(res.data);
    console.log(res);
    // const data = await res.json();
    console.log(res.data);
    // }
    // catch (e) {
    //   history.push("/login");
    //   console.log(e);
    // }
  };

  async function removeFav(id) {
    await axios.post("/favourite/remove", id);
    await axios.get("/favourite");
    // res.send()
  }
  useEffect(() => {
    callHomePage();
  }, []);

  return (
    <div>
      <Header favouriteLen={favourite.length} />
      <h1>Favoourite Page</h1>
      <div className="table">
      <Table  striped bordered hover variant="dark" responsive>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Movie </th>
            <th>Title</th>
            <th></th>
          </tr>
        </thead>
        {cart.map((item, index) => {
          return (
            <tbody>
              <tr>
                <td>{index + 1}</td>

                <td style={{ width: "5%" }}>
                  <Link to={`/movie/${item.imdbID}`} className="link">
                    <img width="100px" src={item.Poster} alt={item.Title} />
                  </Link>
                </td>

                <td>
                  <Link to={`/movie/${item.imdbID}`} className="link">
                    <h6>{item.Title}</h6>
                  </Link>
                </td>

                <td>
                  <Button onClick={() => removeFav(item._id)}>Remove</Button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
      </div>
    </div>
  );
}
