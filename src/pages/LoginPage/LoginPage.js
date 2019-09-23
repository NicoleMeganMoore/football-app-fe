import React, { Component } from "react";
import { signInUser, signOutUser } from "../../redux/modules/authentication";
import { connect } from "react-redux";

import "./LoginPage.css";

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
    const { emailInput, passwordInput } = this.state;

    this.props.signInUser(emailInput, passwordInput);
  };

  render = () => {
    return (
      <div className="login-page">
        <h1>Login Page</h1>
        <input
          id="login-email-input"
          value={this.state.emailInput}
          onChange={e => this.setState({ emailInput: e.target.value })}
        />
        <input
          id="login-password-input"
          type="password"
          value={this.state.passwordInput}
          onChange={e => this.setState({ passwordInput: e.target.value })}
        />
        <button
          onClick={() => this.loginUser()}
          disabled={
            this.state.emailInput.trim().length === 0 ||
            this.state.passwordInput.trim().length === 0
          }
        >
          Log In
        </button>
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
    signOutUser
  }
)(LoginPage);
