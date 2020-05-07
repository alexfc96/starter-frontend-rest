import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./views/Login";
import SignUp from "./views/SignUp";

import Home from "./views/Home";

import { AnonRoute, PrivateRoute } from "./components";

import apiClient from "./services/apiClient";
import Protected from "./views/Protected";
import Logout from "./views/Logout";

class App extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    isLoading: true,
  };

  componentDidMount() {
    apiClient
      .whoami()
      .then((user) => {
        this.setState({
          isLoading: false,
          isLoggedIn: true,
          user,
        });
      })
      .catch((error) => {
        console.log("entro")
        this.setState({
          isLoading: false,
          isLoggedIn: false,
          user: null,
        });
      });
  }

  handleLogin = ({ username, password }) => {
    apiClient
      .login({ username, password })
      .then(({ data: user }) => {
        this.setState({
          isLoggedIn: true,
          user,
        });
      })
      .catch((error) => {
        this.setState({
          isLoggedIn: false,
          user: null,
        });
      });
  };

  handleSignUp = ({ username, password }) => {
    apiClient
      .signup({ username, password })
      .then(({ data: user }) => {
        this.setState({
          isLoggedIn: true,
          user,
        });
      })
      .catch((error) => {
        this.setState({
          isLoggedIn: false,
          user: null,
        });
      });
  };

  handleLogout = () => {
    console.log("logout front")
    apiClient
      .logout()
      .then((res) => {
        console.log(res)
        this.setState({
          isLoggedIn: false,
          user: null,
        });
      })
      .catch((error) => {
        this.setState({
          isLoggedIn: true, //revisar esto bien
        });
      });
  };

  render() {
    const { isLoggedIn, isLoading } = this.state;
    return (
      <div>
        {isLoading && <div> Loading.......</div>}
        {!isLoading && (
          <div className="App">
            <Switch>
              <Route exact path={"/"} component={Home} />
              <AnonRoute exact path={"/login"} isLoggedIn={isLoggedIn}>
                <Login onLogin={this.handleLogin} />
              </AnonRoute>
              <AnonRoute exact path={"/signup"} isLoggedIn={isLoggedIn}>
                <SignUp onsignup={this.handleSignUp} />
              </AnonRoute>
              <PrivateRoute exact path={"/protected"} isLoggedIn={isLoggedIn}>
                <Protected />
              </PrivateRoute>
              <PrivateRoute exact path={"/logout"} isLoggedIn={isLoggedIn}>
                <Logout logout={this.handleLogout} />
              </PrivateRoute>
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

export default App;
