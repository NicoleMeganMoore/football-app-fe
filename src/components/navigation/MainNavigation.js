import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { getIsAuthenticated } from "../../redux/rootReducer";
import {
  navigateToDashboard,
  navigateToLogin,
  signOutUser
} from "../../redux/modules/authentication";

import "./MainNavigation.scss";

class MainNavigation extends Component {
  componentDidMount = () => {
    if (!this.props.isAuthenticated) {
      this.props.navigateToLogin();
    }
  };

  render = () => {
    return (
      <Fragment>
        <header className="main-navigation">
          <div className="main-navigation__logo">
            <h1>FootballApp</h1>
          </div>
          <nav className="main-navigation__items">
            <ul>
              <li className="main-navigation__item">
                <button
                  className="main-navigation__button"
                  onClick={this.props.navigateToDashboard}
                >
                  Dashboard
                </button>
              </li>
              <li className="main-navigation__item">
                <button className="main-navigation__button" onClick={() => {}}>
                  Teams
                </button>
              </li>
              <li className="main-navigation__item">
                <button className="main-navigation__button" onClick={() => {}}>
                  Players
                </button>
              </li>
              <li className="main-navigation__item">
                <button className="main-navigation__button" onClick={() => {}}>
                  Profile
                </button>
              </li>
              <li className="main-navigation__item">
                <button
                  className="main-navigation__button"
                  onClick={this.props.signOutUser}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </nav>
        </header>
        {this.props.children}
      </Fragment>
    );
  };
}

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state)
});

// const mapDispatchToProps = dispatch => ({
//   createItem: item => dispatch(createItem(item)),
//   deleteItem: id => dispatch(deleteItem(id))
// });

export default connect(
  mapStateToProps,
  { navigateToDashboard, navigateToLogin, signOutUser }
)(MainNavigation);
