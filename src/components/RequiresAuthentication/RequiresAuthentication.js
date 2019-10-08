import React, { Component } from "react";
import PropTypes from "prop-types";

export default ComposedComponent => {
  class Authentication extends Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool
    };

    static defaultProps = {
      isAuthenticated: false
    };

    componentDidMount = () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        this.props.history.push("/login");
      }
    };

    render = () => {
      return <ComposedComponent {...this.props} />;
    };
  }
  return Authentication;
};
