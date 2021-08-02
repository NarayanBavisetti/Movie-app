import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./signup.css";
import Header from "./Header";
import UserContext from "../context/userContext";

export default function SignUp() {

  const currentUser = useContext(UserContext);
  const{favourite} = currentUser;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();

  const SignUpHandler = async (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password,
      confirmPassword,
    };
    const res = await axios.post("/register", data);
    console.log(res.data);
    history.push("/login");
    // console.log(data);
  };

  return (
    <div>
      <Header favouriteLen={favourite.length}/>
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card ">
            <div className="cardBody">
              <div className="card-body">
                <h1 className="text-center mb-3">
                  <i className="fas fa-user-plus"></i> Sign Up
                </h1>

                <form onSubmit={SignUpHandler}>
                  <div className="form-group">
                    <label for="name">Name</label>
                    <input
                      type="name"
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder="Enter Name"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label for="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      placeholder="Create Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label for="password2">Confirm Password</label>
                    <input
                      type="password"
                      id="password2"
                      name="password2"
                      className="form-control"
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Register
                  </button>
                </form>
                <p className="lead mt-4">
                  Have An Account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
