import React, { Component } from "react";
import { signInUser, signOutUser } from "../../redux/modules/authentication";
import { connect } from "react-redux";

import { MdPerson, MdLock } from "react-icons/md";
import { GiAmericanFootballHelmet } from "react-icons/gi";

import { FancyButton } from "../FancyButton";

import { getIsSigningIn } from "../../redux/rootReducer";

import {
  navigateToDashboard,
  navigateToRegister
} from "../../redux/modules/authentication";

import "./LoginForm.scss";

class LoginForm extends Component {
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
    return false;
  };

  shouldLoginButtonBeDisabled = () =>
    this.state.emailInput.trim().length === 0 ||
    this.state.passwordInput.trim().length === 0;

  render = () => {
    return (
      <form
        className="login-form-container"
        onSubmit={e => {
          e.preventDefault();
          this.loginUser();
        }}
      >
        <GiAmericanFootballHelmet className="signup-signin-logo" />
        <h2>Log In</h2>

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
            onChange={e => this.setState({ passwordInput: e.target.value })}
          />
          <MdLock className="input-icon" />
        </div>

        <FancyButton
          className="signin-signup-button"
          loading={this.props.isSigningIn}
        >
          Log In
        </FancyButton>

        <div>
          <button
            onClick={this.props.navigateToRegister}
            className="signup-signin-link"
          >
            SIGN UP
          </button>
        </div>
      </form>
    );
  };
}

const mapStateToProps = state => ({
  isSigningIn: getIsSigningIn(state)
});

export default connect(
  mapStateToProps,
  {
    signInUser,
    signOutUser,
    navigateToDashboard,
    navigateToRegister
  }
)(LoginForm);
