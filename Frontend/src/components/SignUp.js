import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
export default function SignUp() {
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
      <h2>Sign Up</h2>
      <form onSubmit={SignUpHandler}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <input
          type="password"
          placeholder="confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
