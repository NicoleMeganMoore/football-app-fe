import React, { Component } from "react";
import { connect } from "react-redux";

import "./ProfilePage.css";

class ProfilePage extends Component {
  componentDidMount = () => {};

  render = () => {
    return <div className="profile-page">Profile</div>;
  };
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(ProfilePage);
