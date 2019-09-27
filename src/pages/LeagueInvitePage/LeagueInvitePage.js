import React, { Component } from "react";
import { connect } from "react-redux";
import _get from "lodash/get";

import { setActivePage } from "../../redux/modules/location";

import "./LeagueInvitePage.css";

class LeagueInvitePage extends Component {
  componentDidMount = () => {
    this.props.setActivePage("invite");

    const leagueId = _get(this.props.params, "leagueId");
    // make sure current user is the one that was invited to the league
    // this.props.fetchLeagueOpponent(leagueId);
  };

  render = () => {
    return (
      <div className="dashboard-page">
        <h1>You've been invited!</h1>
      </div>
    );
  };
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {
    setActivePage
  }
)(LeagueInvitePage);
