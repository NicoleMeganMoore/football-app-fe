import React, { Component } from "react";
// import PropTypes from "prop-types";

import { Provider } from "react-redux";
// import { configureStore } from "./redux/modules/store";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";

import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { Router, Route, browserHistory, Redirect } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

import { NoAuthPage } from "./pages/NoAuthPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LeaguesPage } from "./pages/LeaguesPage";
import { PlayersPage } from "./pages/PlayersPage";
import { ProfilePage } from "./pages/ProfilePage";
import { DraftPage } from "./pages/DraftPage";
import { LeagueInvitePage } from "./pages/LeagueInvitePage";

import MainNavigation from "./components/navigation/MainNavigation";
import RequiresAuthentication from "./components/RequiresAuthentication/RequiresAuthentication";
import CoreLayout from "./layouts/CoreLayout/CoreLayout";

import apolloClient from "./graphql/apolloClient";

import "./App.scss";

export const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: state => state.router
});

class App extends Component {
  componentDidMount = () => {};

  render = () => {
    return (
      <ApolloProvider client={apolloClient}>
        <ApolloHooksProvider client={apolloClient}>
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
                    component={props => (
                      <NoAuthPage {...props} form="register" />
                    )}
                  />
                  <Route component={RequiresAuthentication(MainNavigation)}>
                    <Route path="dashboard" component={DashboardPage} />
                    <Route path="leagues" component={LeaguesPage} />
                    <Route path="players" component={PlayersPage} />
                    <Route path="profile" component={ProfilePage} />
                    <Route path="draft" component={DraftPage} />
                    <Route path="draft/:leagueId" component={DraftPage} />
                    <Route
                      path="invite/:leagueId"
                      component={LeagueInvitePage}
                    />
                  </Route>
                </Route>
              </Router>
            </PersistGate>
          </Provider>
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  };
}

export default App;
