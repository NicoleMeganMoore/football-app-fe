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
    passwordInput: "",
    emailError: "",
    passwordError: ""
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

  getEmailError = email => {
    if (email.trim().length === 0) {
      return "Email is required.";
    }
    return undefined;
  };

  getPasswordError = password => {
    if (password.length === 0) {
      return "Password is required.";
    }
    return undefined;
  };

  loginUser = () => {
    const { emailInput, passwordInput, emailError, passwordError } = this.state;

    if (emailError || passwordError) {
      return;
    }

    this.props
      .signInUser(emailInput, passwordInput)
      .then(() => {
        this.props.navigateToDashboard();
      })
      .catch(errorMessage => {
        this.setState({ error: errorMessage });
      });
    return false;
  };

  render = () => {
    const {
      emailInput,
      passwordInput,
      emailError,
      passwordError,
      error
    } = this.state;

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

        {error && <div className="signin-error-message">{error}</div>}

        <div className="signin-signup-input-container">
          <input
            ref={ref => (this.emailRef = ref)}
            id="login-email-input"
            className="signin-signup-input"
            type="text"
            value={emailInput}
            placeholder="email"
            onChange={e =>
              this.setState({
                emailInput: e.target.value,
                emailError: this.getEmailError(e.target.value)
              })
            }
          />
          <MdPerson className="input-icon" />
          {emailError && (
            <div className="input-validation-error">{emailError}</div>
          )}
        </div>

        <div className="signin-signup-input-container">
          <input
            ref={ref => (this.passwordRef = ref)}
            id="login-password-input"
            className="signin-signup-input"
            type="password"
            placeholder="password"
            value={passwordInput}
            onChange={e =>
              this.setState({
                passwordInput: e.target.value,
                passwordError: this.getPasswordError(e.target.value)
              })
            }
          />
          <MdLock className="input-icon" />
          {passwordError && (
            <div className="input-validation-error">{passwordError}</div>
          )}
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
