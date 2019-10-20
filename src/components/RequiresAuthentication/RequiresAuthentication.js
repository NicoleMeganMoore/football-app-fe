import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { history } from "../../App";
import { getTokens } from "../../redux/rootReducer";

export default ComposedComponent => {
  class Authentication extends Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool
    };

    static defaultProps = {
      isAuthenticated: false
    };

    componentDidMount = () => {
      const { accessToken } = this.props.tokens;
      if (!accessToken) {
        try {
          history.push("/login");
        } catch (error) {
          console.log(error);
        }
      }
    };

    render = () => {
      return <ComposedComponent {...this.props} />;
    };
  }

  const mapStateToProps = state => ({
    tokens: getTokens(state)
  });

  return connect(
    mapStateToProps,
    {}
  )(Authentication);
};
