import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { TeamsPage } from "./pages/TeamsPage";
import { PlayersPage } from "./pages/PlayersPage";
import { ProfilePage } from "./pages/ProfilePage";

import "./App.css";

class App extends Component {
  componentDidMount = () => {
    const axiosInstance = axios.create({
      auth: {
        username: "3216d5f7-36cd-4fa7-b35e-20b3a0",
        password: process.env.MY_SPORTS_FEED_PW
      }
    });

    axiosInstance
      .get(
        "https://api.mysportsfeeds.com/v1.2/pull/nfl/2019-regular/active_players.json"
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect path="/" to="/login" exact />
          <Route path="/login" component={LoginPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/teams" component={TeamsPage} />
          <Route path="/players" component={PlayersPage} />
          <Route path="/profile" component={ProfilePage} />
        </Switch>
      </BrowserRouter>
    );
  };
}

export default App;
