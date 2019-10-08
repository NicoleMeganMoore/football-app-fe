import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ToastContainer, Slide } from "react-toastify";

import draftWarsLogoSVG from "../../images/draftwars-logo.svg";
import apolloClient from "../../graphql/apolloClient";

import {
  getIsAuthenticated,
  getLocation,
  // getIsFetchingLeagues
  getIsFetchingUser
} from "../../redux/rootReducer";

import { subscribeToLeague } from "../../redux/modules/user";

import { signOutUser } from "../../redux/modules/authentication";

import {
  navigateToDashboard,
  navigateToLeagues,
  navigateToPlayers,
  navigateToDraft,
  navigateToProfile
} from "../../redux/modules/location";

import {
  fetchUserDetails
  // fetchLeagues
} from "../../redux/modules/user";

import { fetchSeasonDetails } from "../../redux/modules/season";

import "./MainNavigation.scss";

class MainNavigation extends Component {
  static propTypes = {
    location: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired
  };

  static defaultProps = {
    location: null
  };

  componentDidMount = () => {
    // this.props.fetchLeagues();
    // this.props.fetchUserDetails();
    this.props.fetchSeasonDetails();
    this.props.subscribeToLeague();
  };

  renderSecondaryNavContent = () => {
    if (this.props.location === "/leagues") {
      return (
        <Fragment>
          <div className="secondary-navigation-left-container">
            <div className="secondary-navigation__button">All Leagues</div>
            <div className="secondary-navigation__button">
              Pending Invitations
            </div>
            <div className="secondary-navigation__button">+ New League</div>
          </div>
          <div className="secondary-navigation-right-container">
            <div className="secondary-navigation__button">Settings?</div>
          </div>
        </Fragment>
      );
    }
    if (this.props.location === "/players") {
      return (
        <Fragment>
          <div className="secondary-navigation-left-container">
            <div className="secondary-navigation__button">All Players</div>
            <div className="secondary-navigation__button">Add/Drop Player</div>
          </div>
          <div className="secondary-navigation-right-container">
            <div className="secondary-navigation__button">Settings?</div>
          </div>
        </Fragment>
      );
    }
    return null;
  };

  getNavItemClass = page => {
    return `main-navigation__item${
      this.props.location.includes(page) ? " active" : ""
    }`;
  };

  render = () => {
    return (
      <Fragment>
        <header className="main-navigation">
          <div className="main-navigation-left-container">
            <div className="main-navigation__logo">
              <img
                className="draftwars-logo"
                src={draftWarsLogoSVG}
                alt="DraftWars"
              />
            </div>
            <div className={this.getNavItemClass("/dashboard")}>
              <button
                className="main-navigation__button"
                onClick={this.props.navigateToDashboard}
              >
                Home
              </button>
            </div>
            {
              // <div className={this.getNavItemClass("/leagues")}>
              //   <button
              //     className="main-navigation__button"
              //     onClick={this.props.navigateToLeagues}
              //   >
              //     Leagues
              //   </button>
              // </div>
            }
            <div className={this.getNavItemClass("/players")}>
              <button
                className="main-navigation__button"
                onClick={this.props.navigateToPlayers}
              >
                Players
              </button>
            </div>
            <div className={this.getNavItemClass("/draft")}>
              <button
                className="main-navigation__button"
                onClick={this.props.navigateToDraft}
              >
                Draft
              </button>
            </div>
          </div>

          <div className="main-navigation-right-container">
            {
              // <div className={this.getNavItemClass("/profile")}>
              //   <button
              //     className="main-navigation__button"
              //     onClick={this.props.navigateToProfile}
              //   >
              //     Profile
              //   </button>
              // </div>
            }

            <div className="main-navigation__item">
              <button
                className="main-navigation__button"
                onClick={() => {
                  apolloClient.resetStore();
                  this.props.signOutUser();
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        </header>
        <header
          className={`secondary-navigation${
            ["/players"].includes(this.props.location) ? "" : " hidden"
          }`}
        >
          {this.renderSecondaryNavContent()}
        </header>
        <main
          className={`main-content${
            ["/players"].includes(this.props.location)
              ? " with-secondary-nav"
              : ""
          }`}
        >
          {this.props.children}
        </main>
        <ToastContainer transition={Slide} />
      </Fragment>
    );
  };
}

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
  isFetchingUser: getIsFetchingUser(state),
  location: getLocation(state)
  // isFetchingLeagues: getIsFetchingLeagues(state)
});

// const mapDispatchToProps = dispatch => ({
//   createItem: item => dispatch(createItem(item)),
//   deleteItem: id => dispatch(deleteItem(id))
// });

export default connect(
  mapStateToProps,
  {
    fetchUserDetails,
    navigateToDashboard,
    navigateToLeagues,
    navigateToPlayers,
    navigateToDraft,
    navigateToProfile,
    signOutUser,
    fetchSeasonDetails,
    subscribeToLeague
    // fetchLeagues
  }
)(MainNavigation);
