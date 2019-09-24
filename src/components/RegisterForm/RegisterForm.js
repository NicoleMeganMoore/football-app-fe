import React, { Component } from "react";
import { signInUser, signOutUser } from "../../redux/modules/authentication";
import { connect } from "react-redux";

import { MdPerson, MdLock } from "react-icons/md";
import { GiAmericanFootballHelmet } from "react-icons/gi";

import { FancyButton } from "../FancyButton";

import { getIsSigningIn } from "../../redux/rootReducer";

import {
  navigateToDashboard,
  navigateToLogin
} from "../../redux/modules/authentication";

import "./RegisterForm.scss";

class RegisterForm extends Component {
  state = {
    emailInput: "",
    passwordInput: ""
  };

  registerUser = () => {
    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      passwordInput
    } = this.state;

    this.props
      .createUser(firstNameInput, lastNameInput, emailInput, passwordInput)
      .then(() => {
        this.props.navigateToDashboard();
      });
  };

  shouldRegisterButtonBeDisabled = () => {
    return (
      !this.state.firstNameInput ||
      !this.state.lastNameInput ||
      !this.state.emailInput ||
      !this.state.passwordInput ||
      !this.state.passwordConfirmInput ||
      this.state.passwordInput !== this.state.passwordConfirmInput
    );
  };

  render = () => {
    return (
      <form
        className="register-form-container"
        onSubmit={e => {
          e.preventDefault();
          this.registerUser();
        }}
      >
        <GiAmericanFootballHelmet className="signup-signin-logo" />
        <h2>Sign Up</h2>

        <div className="signin-signup-input-container">
          {" "}
          <input
            id="register-first-name-input"
            className="signin-signup-input"
            type="text"
            value={this.state.firstNameInput}
            placeholder="first name"
            onChange={e => this.setState({ firstNameInput: e.target.value })}
          />
          <MdPerson className="input-icon" />
        </div>

        <div className="signin-signup-input-container">
          {" "}
          <input
            id="register-last-name-input"
            className="signin-signup-input"
            type="text"
            value={this.state.lastNameInput}
            placeholder="last name"
            onChange={e => this.setState({ lastNameInput: e.target.value })}
          />
          <MdPerson className="input-icon" />
        </div>

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

        <div className="signin-signup-input-container">
          <input
            ref={ref => (this.passwordRef = ref)}
            id="login-password-input"
            className="signin-signup-input"
            type="password"
            placeholder="confirm password"
            value={this.state.passwordInput}
            onChange={e => this.setState({ passwordInput: e.target.value })}
          />
          <MdLock className="input-icon" />
        </div>

        <FancyButton
          className="signin-signup-button"
          onClick={() => this.loginUser()}
        >
          Sign Up
        </FancyButton>

        <div>
          <button
            onClick={this.props.navigateToLogin}
            className="signup-signin-link"
          >
            LOG IN
          </button>
        </div>
      </form>
    );
  };
}

const mapStateToProps = state => ({
  // isSigningIn: getIsSigningIn(state)
});

export default connect(
  mapStateToProps,
  {
    signInUser,
    signOutUser,
    navigateToDashboard,
    navigateToLogin
  }
)(RegisterForm);
