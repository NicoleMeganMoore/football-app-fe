import React, { Component } from "react";
import { connect } from "react-redux";

import { setActivePage } from "../../redux/modules/location";

import "./ProfilePage.css";

class ProfilePage extends Component {
  componentDidMount = () => {
    this.props.setActivePage("profile");
  };

  render = () => {
    return <div className="profile-page">Profile</div>;
  };
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {
    setActivePage
  }
)(ProfilePage);
