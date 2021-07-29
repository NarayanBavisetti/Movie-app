import React from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import "./Header.css";

const Header = (props) => {
    const history = useHistory();
 const logoutHandler = async() => {
     const res = await axios.post("/logout");
     if(res){
     history.push("/login");
     }
 }
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
          {/* <Navbar.Brand ><Link className="nav-link" to="/">Movie-app</Link></Navbar.Brand> */}
          <Navbar.Brand href="/">Movie-app</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link className="nav-link" to="/favourite">
                  Favourite
                </Link>
              </Nav.Link>
            </Nav>
            <Nav>
              <InputGroup >
                <FormControl
                onChange={(e) => props.setSearch(e.target.value)}
                value={props.value}
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <Button onClick={logoutHandler}>Logout</Button>
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
export default Header