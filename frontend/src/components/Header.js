import React, { useContext, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
  InputGroup,
  FormControl,
  NavLink,
  Form,
} from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./Header.css";
import UserContext from "../context/userContext";

const Header = (props) => {
  const currentUser = useContext(UserContext);
  const { isLoggedIn, getLoggedIn } = currentUser;

  console.log(currentUser);
  const path = window.location.pathname;

  const history = useHistory();
  const logoutHandler = async () => {
    await axios.get("/logout");
    getLoggedIn();
    console.log(getLoggedIn);
    history.push("/login");
  };
  
  return (
    <div>
      <Navbar
        // fixed="top"
        className="navbar"
        collapseOnSelect
        expand="lg"
        variant="dark"
      >
        <Container>
          <Navbar.Brand>
            <Link className="nav-brand" to="/" style={{ color: "#FFF" }}>
              {" "}
              Movie-app
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link className="nav-link" to="/favourite">
                  Favourite{" "}
                  {props.favouriteLen !== 0 ? <>
                   ({props.favouriteLen})
                   </>
                   :null}
                </Link>
              </Nav.Link>
            </Nav>

            {path === "/" ? (
              <Form className="d-flex">
                <FormControl
                  type="search"
                  onChange={(e) => props.setSearch(e.target.value)}
                  value={props.value}
                  placeholder="Search"
                  className="mr-2"
                  aria-label="Search"
                />
              </Form>
            ) : null}
            <Nav>
              {isLoggedIn ? (
                <Nav.Link>
                  <Button onClick={logoutHandler}>Logout</Button>
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link>
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link className="nav-link" to="/register">
                      Sign Up
                    </Link>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
export default Header;
