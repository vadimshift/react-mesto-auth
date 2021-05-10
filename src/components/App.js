import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./Main";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="page">
      <div className="page__container">
        <Switch>
          <ProtectedRoute
            path="/sign-up"
            loggedIn={loggedIn}
            component={Register}
          />
          <Route path="/sign-in">
            <Login loggedIn={loggedIn} />
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
