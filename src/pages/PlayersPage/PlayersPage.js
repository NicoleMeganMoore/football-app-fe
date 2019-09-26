import React, { Component } from "react";
import { connect } from "react-redux";

import { setActivePage } from "../../redux/modules/authentication";

import "./PlayersPage.css";

class PlayersPage extends Component {
  componentDidMount = () => {
    this.props.setActivePage("players");
  };

  render = () => {
    return (
      <div className="players-page">
        <h1>Players Page</h1>
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
)(PlayersPage);
