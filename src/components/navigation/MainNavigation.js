import React, { Component } from "react";
import { connect } from "react-redux";

import "./MainNavigation.scss";

import { getIsAuthenticated } from "../../redux/rootReducer";

import { navigateToDashboard } from "../../redux/modules/authentication";

class MainNavigation extends Component {
  render = () => {
    // if (!this.props.authenticated) {
    //   return null;
    // }

    return (
      <header className="main-navigation">
        <div className="main-navigation__logo">
          <h1>FootballApp</h1>
        </div>
        <nav className="main-navigation__items">
          <ul>
            <li className="main-navigation__item">
              <a onClick={this.props.navigateToDashboard}>Dashboard</a>
            </li>
            {
              //   <li className="main-navigation__item">
              //   <NavLink to="/teams">Teams</NavLink>
              // </li>
              // <li className="main-navigation__item">
              //   <NavLink to="/players">Players</NavLink>
              // </li>
              // <li className="main-navigation__item">
              //   <NavLink to="/profile">Profile</NavLink>
              // </li>
              // <li className="main-navigation__item">
              //   <NavLink to="/">Logout</NavLink>
              // </li>
            }
          </ul>
        </nav>
      </header>
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
  { navigateToDashboard }
)(MainNavigation);
