import React, { Component } from "react";
import { connect } from "react-redux";

import { setActivePage } from "../../redux/modules/authentication";

import "./TeamsPage.css";

class TeamsPage extends Component {
  componentDidMount = () => {
    this.props.setActivePage("teams");
  };

  render = () => {
    console.log("TEAMS PAGE");
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
  {
    setActivePage
  }
)(TeamsPage);
