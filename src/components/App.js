import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./Main";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className="page">
      <div className="page__container">
        <Switch>
          <Route path="/sign-up">
            <Register loggedIn={loggedIn} />
          </Route>
          <Route path="/sign-in">
            <Login loggedIn={loggedIn} />
          </Route>
          <ProtectedRoute path="/main" loggedIn={loggedIn} component={Main} />
          <Route>
            {loggedIn ? <Redirect to="*" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
