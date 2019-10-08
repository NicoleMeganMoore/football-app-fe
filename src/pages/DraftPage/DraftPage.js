import React, { Component } from "react";
import { connect } from "react-redux";

import _get from "lodash/get";

import "./DraftPage.css";

class DraftPage extends Component {
  componentDidMount = () => {};

  render = () => {
    const hasDraftAvailable = true;
    const leagueId = _get(this.props, "params.leagueId");

    if (leagueId) {
      return <Draft leagueId={leagueId} />;
    }

    return (
      <div className="draft-page">
        {hasDraftAvailable ? (
          <div>Pick a league to start!</div>
        ) : (
          <div>
            You don't have any leagues that need a draft.{" "}
            <u>Start a new league?</u>
          </div>
        )}
      </div>
    );
  };
}

const Draft = ({ leagueId }) => {
  return (
    <div>
      <div>Drafting for league id: {leagueId}</div>
      <div>WAITING FOR YOUR OPPONENT!!!</div>
    </div>
  );
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(DraftPage);
