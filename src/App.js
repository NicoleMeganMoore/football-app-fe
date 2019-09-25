import React, { Component } from "react";
// import PropTypes from "prop-types";

import { Provider } from "react-redux";
import { configureStore } from "./redux/modules/store";
import { PersistGate } from "redux-persist/lib/integration/react";

// import axios from "axios";
import { Router, Route, browserHistory, Redirect } from "react-router";

import { syncHistoryWithStore } from "react-router-redux";

import { NoAuthPage } from "./pages/NoAuthPage";
import { DashboardPage } from "./pages/DashboardPage";
import { TeamsPage } from "./pages/TeamsPage";
import { PlayersPage } from "./pages/PlayersPage";
import { ProfilePage } from "./pages/ProfilePage";

import MainNavigation from "./components/navigation/MainNavigation";
import RequiresAuthentication from "./components/RequiresAuthentication/RequiresAuthentication";

import CoreLayout from "./layouts/CoreLayout/CoreLayout";

import "./App.scss";

const initialState = window.__INITIAL_STATE__;
export const { store, persistor } = configureStore(
  initialState,
  browserHistory
);

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: state => state.router
});

class App extends Component {
  componentDidMount = () => {
    // const axiosInstance = axios.create({
    //   auth: {
    //     username: "3216d5f7-36cd-4fa7-b35e-20b3a0",
    //     password: process.env.MY_SPORTS_FEED_PW
    //   }
    // });
    // axiosInstance
    //   .get(
    //     "https://api.mysportsfeeds.com/v1.2/pull/nfl/2019-regular/active_players.json"
    //   )
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  render = () => {
    return (
      <Provider store={store}>
        <PersistGate loading={<div>Loading</div>} persistor={persistor}>
          <Router history={history}>
            <Redirect from="/" to="/login" />
            <Route path="/" component={CoreLayout}>
              <Route
                path="login"
                component={props => <NoAuthPage {...props} form="login" />}
              />
              <Route
                path="register"
                component={props => <NoAuthPage {...props} form="register" />}
              />
              <Route component={RequiresAuthentication(MainNavigation)}>
                <Route path="dashboard" component={DashboardPage} />
                <Route path="teams" component={TeamsPage} />
                <Route path="players" component={PlayersPage} />
                <Route path="profile" component={ProfilePage} />
              </Route>
            </Route>
          </Router>
        </PersistGate>
      </Provider>
    );
  };
}

export default App;
