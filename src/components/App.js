import React, { useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import * as apiAuth from "../utils/apiAuth";
import Main from "./Main";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  const onRegister = (data) => {
    return apiAuth.register(data).then(() => {
      history.push("/sign-in");
    });
  };

  const onLogin = (data) => {
    return apiAuth
      .authorize(data)
      .then((data) => {
        console.log(data.token)
        //setUserInfo({ username, email });
        setLoggedIn(true);
        localStorage.setItem('jwt', data.token);
      });
  };

  return (
    <div className="page">
      <div className="page__container">
        <Switch>
          <Route path="/sign-up">
            <Register loggedIn={loggedIn} onRegister={onRegister} />
          </Route>
          <Route path="/sign-in">
            <Login loggedIn={loggedIn} onLogin={onLogin}/>
          </Route>
          <ProtectedRoute path="/main" loggedIn={loggedIn} component={Main} />
          <Route>
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
