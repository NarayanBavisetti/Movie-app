import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "./context/userContext";


function PrivateRoute({ component: Component, ...rest })
{
const currentUser = useContext(UserContext);
const {isLoggedIn} = currentUser;
  return (
    <Route
      {...rest}
      render = { props => {
          return isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
        }
      }
    />
  );
};

export default PrivateRoute;
