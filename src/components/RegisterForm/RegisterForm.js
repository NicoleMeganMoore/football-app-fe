import React, { Component } from "react";
import { connect } from "react-redux";
import { MdPerson, MdLock } from "react-icons/md";
import { GiAmericanFootballHelmet } from "react-icons/gi";

import { history } from "../../App";
import { FancyButton } from "../FancyButton";
import { createUser, signInUser } from "../../redux/modules/authentication";

import {
  navigateToDashboard,
  navigateToLogin
} from "../../redux/modules/location";

import "./RegisterForm.scss";

class RegisterForm extends Component {
  state = {
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    passwordInput: "",
    passwordConfirmInput: "",
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: ""
  };

  registerUser = async () => {
    this.setState({ isCreatingUserAndAuthenticating: true });

    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      passwordInput
    } = this.state;

    try {
      await this.props.createUser(
        firstNameInput,
        lastNameInput,
        emailInput,
        passwordInput
      );
      await this.props.signInUser(emailInput, passwordInput);
      this.props.navigateToDashboard();
    } catch (err) {
      if (err) {
        this.setState({
          error: err,
          isCreatingUserAndAuthenticating: false
        });
      }
    }
  };

  firstNameError = firstName => {
    if (!firstName) {
      return "First Name is required";
    }
    return undefined;
  };

  lastNameError = lastName => {
    if (!lastName) {
      return "Last Name is required";
    }
    return undefined;
  };

  emailError = email => {
    if (!email) {
      return "Email is required";
    }
    // else if (this.state.emailInput is invalid...) {
    // }
    return undefined;
  };

  passwordError = password => {
    if (!password) {
      return "Password is required";
    }
    // else if (password isnt strong enough) {
    // }
    return undefined;
  };

  passwordConfirmError = password => {
    if (password !== this.state.passwordInput) {
      return "Passwords do not match";
    }
    return undefined;
  };

  onPasswordConfirmChange = e => {
    let passwordConfirmError;

    const passwordMismatch = this.state.passwordInput !== e.target.value;
    if (passwordMismatch) {
      passwordConfirmError = "Passwords do not match";
    }

    this.setState({
      passwordConfirmInput: e.target.value,
      passwordConfirmError
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const firstNameError = this.firstNameError(this.state.firstNameInput);
    const lastNameError = this.lastNameError(this.state.lastNameInput);
    const emailError = this.emailError(this.state.emailInput);
    const passwordError = this.passwordError(this.state.passwordInput);
    const passwordConfirmError = this.passwordConfirmError(
      this.state.passwordConfirmInput
    );

    if (
      firstNameError ||
      lastNameError ||
      emailError ||
      passwordError ||
      passwordConfirmError
    ) {
      this.setState({
        firstNameError,
        lastNameError,
        emailError,
        passwordError,
        passwordConfirmError
      });
    } else {
      this.registerUser();
    }
  };

  render = () => {
    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      passwordInput,
      passwordConfirmInput,
      firstNameError,
      lastNameError,
      emailError,
      passwordError,
      passwordConfirmError
    } = this.state;

    return (
      <form className="register-form-container" onSubmit={this.onSubmit}>
        <GiAmericanFootballHelmet className="signup-signin-logo" />
        <h2>Sign Up</h2>

        <div className="signin-signup-input-container">
          {" "}
          <input
            id="register-first-name-input"
            className="signin-signup-input"
            type="text"
            value={firstNameInput}
            name="first-name"
            placeholder="First Name"
            onChange={e =>
              this.setState({
                firstNameInput: e.target.value,
                firstNameError: this.firstNameError(e.target.value)
              })
            }
          />
          <MdPerson className="input-icon" />
          {firstNameError && (
            <div
              data-test="input-validation-error"
              className="input-validation-error"
            >
              {firstNameError}
            </div>
          )}
        </div>

        <div className="signin-signup-input-container">
          {" "}
          <input
            id="register-last-name-input"
            className="signin-signup-input"
            type="text"
            name="last-name"
            value={lastNameInput}
            placeholder="Last Name"
            onChange={e =>
              this.setState({
                lastNameInput: e.target.value,
                lastNameError: this.lastNameError(e.target.value)
              })
            }
          />
          <MdPerson className="input-icon" />
          {lastNameError && (
            <div
              data-test="input-validation-error"
              className="input-validation-error"
            >
              {lastNameError}
            </div>
          )}
        </div>

        <div className="signin-signup-input-container">
          <input
            ref={ref => (this.emailRef = ref)}
            id="register-email-input"
            className="signin-signup-input"
            type="text"
            name="email"
            value={emailInput}
            placeholder="Email"
            onChange={e =>
              this.setState({
                emailInput: e.target.value,
                emailError: this.emailError(e.target.value)
              })
            }
          />
          <MdPerson className="input-icon" />
          {emailError && (
            <div
              data-test="input-validation-error"
              className="input-validation-error"
            >
              {emailError}
            </div>
          )}
        </div>

        <div className="signin-signup-input-container">
          <input
            ref={ref => (this.passwordRef = ref)}
            id="register-password-input"
            className="signin-signup-input"
            type="password"
            name="password"
            placeholder="Password"
            value={passwordInput}
            onChange={e =>
              this.setState({
                passwordInput: e.target.value,
                passwordError: this.passwordError(e.target.value)
              })
            }
          />
          <MdLock className="input-icon" />
          {passwordError && (
            <div
              data-test="input-validation-error"
              className="input-validation-error"
            >
              {passwordError}
            </div>
          )}
        </div>

        <div className="signin-signup-input-container">
          <input
            ref={ref => (this.passwordRef = ref)}
            id="register-password-confirm-input"
            className="signin-signup-input"
            type="password"
            name="confirm-password"
            placeholder="Confirm Password"
            value={passwordConfirmInput}
            onChange={this.onPasswordConfirmChange}
          />
          <MdLock className="input-icon" />
          {passwordConfirmError && (
            <div
              data-test="input-validation-error"
              className="input-validation-error"
            >
              {passwordConfirmError}
            </div>
          )}
        </div>

        <FancyButton
          className="signin-signup-button"
          loading={this.state.isCreatingUserAndAuthenticating}
        >
          Sign Up
        </FancyButton>

        <div>
          <button
            onClick={() => history.push("/login")}
            className="signup-signin-link"
          >
            LOG IN
          </button>
        </div>
      </form>
    );
  };
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {
    navigateToDashboard,
    navigateToLogin,
    signInUser,
    createUser
  }
)(RegisterForm);
