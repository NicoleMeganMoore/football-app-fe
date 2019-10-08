import React, { Component } from "react";
// import PropTypes from "prop-types";

import { withApollo, Mutation } from "react-apollo";
import apolloClient from "../../graphql/apolloClient";
import gql from "graphql-tag";
// import { useQuery } from "react-apollo-hooks";
import _get from "lodash/get";

import { history } from "../../App";

import { MdPerson, MdLock } from "react-icons/md";
import { GiAmericanFootballHelmet } from "react-icons/gi";

// REDUX ----------------------------------------------------------------------
// import { connect } from "react-redux";
// import { signInUser, signOutUser } from "../../redux/modules/authentication";
// import {
//   navigateToDashboard,
//   navigateToRegister
// } from "../../redux/modules/location";
// REDUX ----------------------------------------------------------------------

import { FancyButton } from "../FancyButton";
import "./LoginForm.scss";

const LOGIN_MUTATION = gql`
  mutation LoginQuery($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      tokens {
        accessToken
        refreshToken
      }
      userId
      tokenExpiration
    }
  }
`;

class LoginForm extends Component {
  static propTypes = {};

  state = {
    isSigningIn: false,
    emailInput: "",
    passwordInput: "",
    emailError: "",
    passwordError: ""
  };

  componentDidMount = () => {
    const autoEmail = _get(
      document,
      'getElementById("login-email-input").autocomplete',
      ""
    );
    const autoPassword = _get(
      document,
      'getElementById("login-password-input").autocomplete;',
      ""
    );

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

  loginUser = async mutate => {
    apolloClient.resetStore();
    this.setState({ isSigningIn: true });
    const { emailInput, passwordInput, emailError, passwordError } = this.state;

    if (emailError || passwordError) {
      return;
    }

    try {
      // Query using graphql
      const response = await mutate({
        variables: {
          email: emailInput,
          password: passwordInput
        }
      });

      localStorage.setItem(
        "accessToken",
        _get(response, "data.login.tokens.accessToken")
      );
      localStorage.setItem(
        "refreshToken",
        _get(response, "data.login.tokens.refreshToken")
      );

      this.setState({ isSigningIn: false });
      history.push("/dashboard");
    } catch (err) {
      this.setState({
        isSigningIn: false,
        loginError: _get(err, "graphQLErrors[0].message")
      });
    }
  };

  render = () => {
    const {
      emailInput,
      passwordInput,
      emailError,
      passwordError,
      loginError
    } = this.state;

    return (
      <Mutation mutation={LOGIN_MUTATION}>
        {mutate => (
          <form
            className="login-form-container"
            onSubmit={async e => {
              e.preventDefault();
              this.loginUser(mutate);
            }}
          >
            <GiAmericanFootballHelmet className="signup-signin-logo" />
            <h2>Log In</h2>

            {loginError && (
              <div className="signin-error-message">{loginError}</div>
            )}

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
                <div
                  data-test="input-validation-error"
                  className="input-validation-error"
                >
                  {passwordError}
                </div>
              )}
            </div>
            <FancyButton
              className="signin-signup-button"
              data-test="form-submit-button"
              loading={this.state.isSigningIn}
            >
              Log In
            </FancyButton>
            <div>
              <button
                // onClick={this.props.navigateToRegister}
                className="signup-signin-link"
              >
                SIGN UP
              </button>
            </div>
          </form>
        )}
      </Mutation>
    );
  };
}

export default withApollo(LoginForm);
