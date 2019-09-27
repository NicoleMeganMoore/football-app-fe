import React, { Component } from "react";
import { connect } from "react-redux";

import "./TeamsPage.css";

class TeamsPage extends Component {
  componentDidMount = () => {};

  render = () => {
    return (
      <div className="teams-page">
        <h1>Teams Page</h1>
      </div>
    );
  };
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(TeamsPage);
