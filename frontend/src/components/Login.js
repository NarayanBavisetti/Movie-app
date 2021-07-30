import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "./signup.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory("");

  const LogInHandler = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    await axios.post("/login", data);
    history.push("/");
    // console.log(data);
  };
  return (
    <div>
      <Header />

      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card ">
            <div className="cardBody">
              <div className="card-body">
                <h1 className="text-center mb-3">
                  <i className="fas fa-sign-in-alt"></i> Login
                </h1>

                <form onSubmit={LogInHandler}>
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
                      placeholder="Enter Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">
                    Login
                  </button>
                </form>

                <p className="lead mt-4">
                  Do Not have an Account? <Link to="/register">Register</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
