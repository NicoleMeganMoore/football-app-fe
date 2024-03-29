import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { LoginForm } from "../../components/LoginForm";
import { RegisterForm } from "../../components/RegisterForm";

import { getIsSigningIn } from "../../redux/rootReducer";
import { signInUser, signOutUser } from "../../redux/modules/authentication";

import {
  navigateToDashboard,
  navigateToRegister
} from "../../redux/modules/location";

import "./NoAuthPage.scss";

class NoAuthPage extends Component {
  static propTypes = {
    form: PropTypes.string.isRequired
  };

  render = () => {
    return (
      <div className="login-register-page">
        <div className="login-register-page-background-overlay" />
        <div className="login-register-page-container">
          {
            <div className="noauth-header-container">
              <div className="noauth-header-left-container">
                <button className="signup-signin-link">DraftWars</button>
              </div>
              <div className="noauth-header-right-container">
                <button className="signup-signin-link"> </button>
              </div>
            </div>
          }

          {this.props.form === "login" && <LoginForm />}
          {this.props.form === "register" && <RegisterForm />}
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  isSigningIn: getIsSigningIn(state)
});

// const mapDispatchToProps = dispatch => ({
//   createItem: item => dispatch(createItem(item)),
//   deleteItem: id => dispatch(deleteItem(id))
// });

export default connect(
  mapStateToProps,
  {
    signInUser,
    signOutUser,
    navigateToDashboard,
    navigateToRegister
  }
)(NoAuthPage);
