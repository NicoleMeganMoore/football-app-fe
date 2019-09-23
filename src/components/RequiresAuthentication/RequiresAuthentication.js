import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { getIsAuthenticated } from "../../redux/rootReducer";

export default ComposedComponent => {
  class Authentication extends Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool
    };

    static defaultProps = {
      isAuthenticated: false
    };

    componentDidMount = () => {
      console.log("AUTHENTICATION COMPONENT MOUNTED");
    };

    render = () => {
      if (!this.props.isAuthenticated) {
        console.log("not authenticated..... redirecting");
        // return <Redirect to="/" />;
        return null;
      }
      console.log("AUTHENTICATED! RENDERING NAV COMPONENT NOW");
      return <ComposedComponent {...this.props} />;
    };
  }

  const mapStateToProps = state => ({
    isAuthenticated: getIsAuthenticated(state)
  });

  return connect(
    mapStateToProps,
    {}
  )(Authentication);
};
