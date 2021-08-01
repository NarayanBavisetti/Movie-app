import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();
export default UserContext;

export function UserContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);

  async function getLoggedIn() {
    const res = await axios.get("/loggedIn");
    console.log(res.data)
    setIsLoggedIn(res.data);
    
  }
  useEffect(() => {
    getLoggedIn();
  },);

  const context = {
    isLoggedIn: isLoggedIn,
    getLoggedIn: setIsLoggedIn,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}
