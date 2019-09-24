import React, { Component } from "react";
import { signInUser, signOutUser } from "../../redux/modules/authentication";
import { connect } from "react-redux";

import "./DashboardPage.css";

class DashboardPage extends Component {
  render = () => {
    return (
      <div className="dashboard-page">
        <h1>Dashboard Page</h1>
      </div>
    );
  };
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {
    signInUser,
    signOutUser
  }
)(DashboardPage);
