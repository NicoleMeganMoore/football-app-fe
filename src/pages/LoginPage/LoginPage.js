import React, { Component } from "react";
import { signInUser, signOutUser } from "../../redux/modules/authentication";
import { connect } from "react-redux";

import { MdPerson, MdLock } from "react-icons/md";
import { GiAmericanFootballHelmet } from "react-icons/gi";
import Loader from "react-loader-spinner";

import { getIsSigningIn } from "../../redux/rootReducer";

import {
  navigateToDashboard,
  navigateToRegister
} from "../../redux/modules/authentication";

import "./LoginPage.scss";

class LoginPage extends Component {
  state = {
    emailInput: "",
    passwordInput: ""
  };

  componentDidMount = () => {
    const autoEmail = document.getElementById("login-email-input").autocomplete;
    const autoPassword = document.getElementById("login-password-input")
      .autocomplete;
    if (autoEmail || autoPassword) {
      this.setState({
        emailInput: autoEmail,
        passwordInput: autoPassword
      });
    }
  };

  loginUser = () => {
    if (this.shouldLoginButtonBeDisabled()) {
      return;
    }
    const { emailInput, passwordInput } = this.state;
    this.props.signInUser(emailInput, passwordInput).then(() => {
      this.props.navigateToDashboard();
    });
  };

  shouldLoginButtonBeDisabled = () =>
    this.state.emailInput.trim().length === 0 ||
    this.state.passwordInput.trim().length === 0;

  onKeyPress = e => {
    if (e.key === "Enter") {
      this.loginUser();
    }
  };

  render = () => {
    return (
      <div className="login-register-page">
        <div className="login-register-page-background-overlay" />
        <div className="login-form-container">
          <h1>
            <GiAmericanFootballHelmet className="signup-signin-logo" />
          </h1>
          <div className="signin-signup-input-container">
            <input
              ref={ref => (this.emailRef = ref)}
              id="login-email-input"
              className="signin-signup-input"
              type="text"
              value={this.state.emailInput}
              placeholder="email"
              onChange={e => this.setState({ emailInput: e.target.value })}
            />
            <MdPerson className="input-icon" />
          </div>
          <div className="signin-signup-input-container">
            <input
              ref={ref => (this.passwordRef = ref)}
              id="login-password-input"
              className="signin-signup-input"
              type="password"
              placeholder="password"
              value={this.state.passwordInput}
              onKeyPress={this.onKeyPress}
              onChange={e => this.setState({ passwordInput: e.target.value })}
            />
            <MdLock className="input-icon" />
          </div>
          <button
            className="signin-signup-button"
            onClick={() => this.loginUser()}
          >
            {this.props.isSigningIn && (
              <Loader
                className="spinner-inline"
                type="TailSpin"
                color="rgba(255,255,255,0.8)"
                height={20}
                width={20}
              />
            )}
            Log In
          </button>
          <div>
            <button
              onClick={this.props.navigateToRegister}
              className="signup-signin-link"
            >
              Sign Up
            </button>
          </div>
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
)(LoginPage);
