import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { getIsAuthenticated } from "../../redux/rootReducer";

import { navigateToLogin } from "../../redux/modules/authentication";

export default ComposedComponent => {
  class Authentication extends Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool
    };

    static defaultProps = {
      isAuthenticated: false
    };

    render = () => {
      if (!this.props.isAuthenticated) {
        this.props.navigateToLogin();
      }
      return <ComposedComponent {...this.props} />;
    };
  }

  const mapStateToProps = state => ({
    isAuthenticated: getIsAuthenticated(state)
  });

  return connect(
    mapStateToProps,
    { navigateToLogin }
  )(Authentication);
};
