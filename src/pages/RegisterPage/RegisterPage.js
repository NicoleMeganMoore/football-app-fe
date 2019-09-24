import React, { Component } from "react";
import { signInUser, signOutUser } from "../../redux/modules/authentication";
import { connect } from "react-redux";

import {
  navigateToDashboard,
  navigateToLogin,
  createUser
} from "../../redux/modules/authentication";

import "./RegisterPage.css";

class RegisterPage extends Component {
  state = {
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    passwordInput: "",
    passwordConfirmInput: ""
  };

  componentDidMount = () => {
    // const autoEmail = document.getElementById("login-email-input").autocomplete;
    // const autoPassword = document.getElementById("login-password-input")
    //   .autocomplete;
    // if (autoEmail || autoPassword) {
    //   this.setState({
    //     emailInput: autoEmail,
    //     passwordInput: autoPassword
    //   });
    // }
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
      <div className="login-register-page">
        <div className="login-form-container">
          <h1>Sign Up</h1>
          <input
            id="register-first-name-input"
            value={this.state.firstNameInput}
            onChange={e => this.setState({ firstNameInput: e.target.value })}
          />
          <input
            id="register-last-name-input"
            value={this.state.lastNameInput}
            onChange={e => this.setState({ lastNameInput: e.target.value })}
          />
          <input
            id="register-email-input"
            value={this.state.emailInput}
            onChange={e => this.setState({ emailInput: e.target.value })}
          />
          <input
            id="register-password-input"
            type="password"
            value={this.state.passwordInput}
            onChange={e => this.setState({ passwordInput: e.target.value })}
          />
          <input
            id="register-password-confirm-input"
            type="password"
            value={this.state.passwordConfirmInput}
            onChange={e =>
              this.setState({ passwordConfirmInput: e.target.value })
            }
          />
          <button
            onClick={() => this.registerUser()}
            disabled={this.shouldRegisterButtonBeDisabled()}
          >
            Sign Up
          </button>
        </div>
        <div>
          Already have an account?{" "}
          <button onClick={this.props.navigateToLogin} className="login-link">
            Log In
          </button>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  items: state.items
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
    navigateToLogin,
    createUser
  }
)(RegisterPage);
