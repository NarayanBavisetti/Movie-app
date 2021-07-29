import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';

export default function Login () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory("");

  const LogInHandler =  async(e) => {
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
      <h2>Log In</h2>
      <form onSubmit={LogInHandler}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
