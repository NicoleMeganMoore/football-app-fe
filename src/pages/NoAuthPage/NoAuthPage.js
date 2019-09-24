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
} from "../../redux/modules/authentication";

import "./NoAuthPage.scss";

class NoAuthPage extends Component {
  static propTypes = {
    form: PropTypes.string.isRequired
  };

  render = () => {
    console.log("RENDERING NO AUTH PAGE");
    return (
      <div className="login-register-page">
        <div className="login-register-page-background-overlay" />
        {
          // <div className="noauth-header-container">
          //   <div className="noauth-header-left-container"></div>
          //   <div className="noauth-header-right-container">
          //     <button className="signup-signin-link">Sign Up</button>
          //     <button className="signup-signin-link">Log In</button>
          //   </div>
          // </div>
        }

        {this.props.form === "login" && <LoginForm />}
        {this.props.form === "register" && <RegisterForm />}
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
