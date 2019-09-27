import React, { Component } from "react";
import { connect } from "react-redux";
import _get from "lodash/get";

import { fetchLeagueById } from "../../redux/modules/user";

import "./LeagueInvitePage.css";

class LeagueInvitePage extends Component {
  componentDidMount = () => {
    const leagueId = _get(this.props.params, "leagueId");
    // make sure current user is the one that was invited to the league
    this.props
      .fetchLeagueById(leagueId)
      .then(league => {
        // if (_get(league, 'opponent') === )
      })
      .catch(err => {
        console.log(err);
      });
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
    fetchLeagueById
  }
)(LeagueInvitePage);
