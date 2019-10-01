import React, { Component } from "react";
import { connect } from "react-redux";

import "./PlayersPage.css";

class PlayersPage extends Component {
  componentDidMount = () => {};

  render = () => {
    return (
      <div className="players-page">
        List of players will go here. User should be able to switch between
        active leagues in a dropdown on the top right.
      </div>
    );
  };
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(PlayersPage);
