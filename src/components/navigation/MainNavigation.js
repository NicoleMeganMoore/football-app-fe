import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { ToastContainer, Slide } from "react-toastify";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import _get from "lodash/get";

// import { store } from "../../App";
import { getLocation } from "../../redux/rootReducer";
import { signOutUser } from "../../redux/modules/authentication";
import { PLAYERS_QUERY, USER_QUERY } from "../../graphql/queries";
import draftWarsLogoSVG from "../../images/draftwars-logo.svg";
import apolloClient from "../../graphql/apolloClient";
import { history } from "../../App";

import "./MainNavigation.scss";

class MainNavigation extends Component {
  static propTypes = {
    location: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired
  };

  static defaultProps = {
    location: null
  };

  signOutUser = () => {
    this.props.signOutUser();
    history.push("/login");
  };

  renderSecondaryNavContent = () => {
    if (history.location === "/leagues") {
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
      this.props.location.includes(page) || this.props.location === page
        ? " active"
        : ""
    }`;
  };

  render = () => {
    return (
      <Query query={USER_QUERY}>
        {({ loading: userLoading, data: userData }) => (
          <Query query={PLAYERS_QUERY}>
            {({ loading, error, data, refetch, networkStatus }) => (
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
                        onClick={() => history.push("/dashboard")}
                      >
                        Home
                      </button>
                    </div>
                    {
                      // <div className={this.getNavItemClass("/leagues")}>
                      //   <button
                      //     className="main-navigation__button"
                      //     onClick={() => history.push('/leagues')}
                      //   >
                      //     Leagues
                      //   </button>
                      // </div>
                    }
                    <div className={this.getNavItemClass("/players")}>
                      <button
                        className="main-navigation__button"
                        onClick={() => history.push("/players")}
                      >
                        Players
                      </button>
                    </div>
                    <div className={this.getNavItemClass("/draft")}>
                      <button
                        className="main-navigation__button"
                        onClick={() => history.push("/draft")}
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
                      //     onClick={() => history.push('/profile')}
                      //   >
                      //     Profile
                      //   </button>
                      // </div>
                    }

                    <div>{_get(userData, "user.email")}</div>
                    <div className="main-navigation__item">
                      <button
                        className="main-navigation__button"
                        onClick={() => {
                          apolloClient.resetStore();
                          this.signOutUser();
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
            )}
          </Query>
        )}
      </Query>
    );
  };
}

// const mapDispatchToProps = dispatch => ({
//   createItem: item => dispatch(createItem(item)),
//   deleteItem: id => dispatch(deleteItem(id))
// });

const mapStateToProps = state => ({
  location: getLocation(state)
});

export default connect(
  mapStateToProps,
  {
    signOutUser
  }
)(MainNavigation);
