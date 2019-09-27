import React, { Component } from "react";
import { signInUser, signOutUser } from "../../redux/modules/authentication";
import { connect } from "react-redux";
import _get from "lodash/get";

import {
  getLeagues,
  getIsCreatingLeague,
  getIsFetchingLeagues
} from "../../redux/rootReducer";
import { createLeague } from "../../redux/modules/user";
import { setActivePage } from "../../redux/modules/location";

import "./DashboardPage.css";

class DashboardPage extends Component {
  componentDidMount = () => {
    this.props.setActivePage("dashboard");
  };

  createLeague = () => {
    this.props
      .createLeague()
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderActiveLeagueList = () => {
    if (this.props.isFetchingLeagues) {
      return <div>loading...</div>;
    }

    if (_get(this.props.leagues, "length")) {
      return this.props.leagues.map(league => {
        return <h1>{league.id}</h1>;
      });
    }

    return null;
  };

  render = () => {
    return (
      <div className="dashboard-page">
        {
          // If no leagues
          // Show button to start league and invite a friend
          // Start a head to head league. You can start a league any time and choose
          // the weeks you want to play
        }
        <h1>Dashboard Page</h1>
        <button onClick={this.createLeague}>Start a League</button>
        {this.renderActiveLeagueList()}
      </div>
    );
  };
}

const mapStateToProps = state => ({
  leagues: getLeagues(state),
  isCreatingLeague: getIsCreatingLeague(state),
  isFetchingLeagues: getIsFetchingLeagues(state)
});

export default connect(
  mapStateToProps,
  {
    signInUser,
    signOutUser,
    setActivePage,
    createLeague
  }
)(DashboardPage);
