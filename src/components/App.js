import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import * as apiAuth from "../utils/apiAuth";
import Main from "./Main";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [userEmail, setUserEmail] = useState({
    email: "",
  });

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [isRegisterResult, setRigisterResult] = useState(true);

  const history = useHistory();

  const closeInfoTooltipPopup = () => {
    setIsInfoTooltipOpen(false);
  };

  const onRegister = (data) => {
    return apiAuth
      .register(data)
      .then(() => {
        setIsInfoTooltipOpen(true);
        history.push("/sign-in");
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setRigisterResult(false);
      });
  };

  const onLogin = (data) => {
    return apiAuth.authorization(data).then((data) => {
      setLoggedIn(true);
      localStorage.setItem("token", data.token);
    });
  };

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    apiAuth.getContent(token).then((data) => {
      setUserEmail(data.data.email);
      setLoggedIn(true);
    });
  };

  useEffect(() => {
    checkToken();
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      history.push("/main");
    }
  }, [loggedIn, history]);

  const onLogout = () => {
    setLoggedIn(false);
    setUserEmail("");
    localStorage.removeItem("token");
    history.push("/sign-in");
  };

  return (
    <div className="page">
      <div className="page__container">
        <Switch>
          <Route path="/sign-up">
            <Register loggedIn={loggedIn} onRegister={onRegister} />
          </Route>
          <Route path="/sign-in">
            <Login loggedIn={loggedIn} onLogin={onLogin} />
          </Route>
          <ProtectedRoute
            path="/main"
            loggedIn={loggedIn}
            onLogout={onLogout}
            userEmail={userEmail}
            component={Main}
          />
          <Route>
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeInfoTooltipPopup}
          isResult={isRegisterResult}
        />
      </div>
    </div>
  );
}

export default App;
