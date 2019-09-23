import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import "./MainNavigation.scss";

import { getIsAuthenticated } from "../../redux/rootReducer";

import { navigateToDashboard } from "../../redux/modules/authentication";

class MainNavigation extends Component {
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
                <a onClick={this.props.navigateToDashboard}>Dashboard</a>
              </li>
              <li className="main-navigation__item">
                <a onClick={() => {}}>Teams</a>
              </li>
              <li className="main-navigation__item">
                <a onClick={() => {}}>Players</a>
              </li>
              <li className="main-navigation__item">
                <a onClick={() => {}}>Profile</a>
              </li>
              <li className="main-navigation__item">
                <a onClick={() => {}}>Logout</a>
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
  { navigateToDashboard }
)(MainNavigation);
