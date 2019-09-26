import React, { Component } from "react";
import { connect } from "react-redux";

import { setActivePage } from "../../redux/modules/authentication";

import "./ProfilePage.css";

class ProfilePage extends Component {
  componentDidMount = () => {
    this.props.setActivePage("profile");
  };

  render = () => {
    return (
      <div className="profile-page">
        <h1>Profile Page</h1>
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
)(ProfilePage);
