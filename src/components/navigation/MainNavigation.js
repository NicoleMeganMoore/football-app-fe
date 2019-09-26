import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getIsAuthenticated, getActivePage } from "../../redux/rootReducer";

import { signOutUser } from "../../redux/modules/authentication";

import {
  navigateToDashboard,
  navigateToLogin,
  navigateToTeams,
  navigateToPlayers,
  navigateToProfile
} from "../../redux/modules/location";

import "./MainNavigation.scss";

class MainNavigation extends Component {
  static propTypes = {
    activePage: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  };

  componentDidMount = () => {
    if (!this.props.isAuthenticated) {
      this.props.navigateToLogin();
    }
  };

  getNavItemClass = page => {
    return `main-navigation__item${
      page === this.props.activePage ? " active" : ""
    }`;
  };

  render = () => {
    console.log(this.props.activePage);
    return (
      <Fragment>
        <header className="main-navigation">
          <div className="main-navigation-left-container">
            <div className="main-navigation__logo">
              <h1>DraftWars</h1>
            </div>
            <div className={this.getNavItemClass("dashboard")}>
              <button
                className="main-navigation__button"
                onClick={this.props.navigateToDashboard}
              >
                Dashboard
              </button>
            </div>
            <div className={this.getNavItemClass("teams")}>
              <button
                className="main-navigation__button"
                onClick={this.props.navigateToTeams}
              >
                Teams
              </button>
            </div>
            <div className={this.getNavItemClass("players")}>
              <button
                className="main-navigation__button"
                onClick={this.props.navigateToPlayers}
              >
                Players
              </button>
            </div>
          </div>

          <div className="main-navigation-right-container">
            <div className={this.getNavItemClass("profile")}>
              <button
                className="main-navigation__button"
                onClick={this.props.navigateToProfile}
              >
                Profile
              </button>
            </div>
            <div className="main-navigation__item">
              <button
                className="main-navigation__button"
                onClick={this.props.signOutUser}
              >
                Log Out
              </button>
            </div>
          </div>
        </header>
        {
          // <header className="secondary-navigation">
          //   <div className="secondary-navigation-left-container">awefl</div>
          //   <div className="secondary-navigation-right-container">;lkj;</div>
          // </header>
        }
        {this.props.children}
      </Fragment>
    );
  };
}

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
  activePage: getActivePage(state)
});

// const mapDispatchToProps = dispatch => ({
//   createItem: item => dispatch(createItem(item)),
//   deleteItem: id => dispatch(deleteItem(id))
// });

export default connect(
  mapStateToProps,
  {
    navigateToDashboard,
    navigateToLogin,
    navigateToTeams,
    navigateToPlayers,
    navigateToProfile,
    signOutUser
  }
)(MainNavigation);
