import React from "react";
import PropTypes from "prop-types";

const CoreLayout = ({ children }) => {
  return <div className="page-container">{children}</div>;
};

CoreLayout.propTypes = {
  children: PropTypes.element
};

export default CoreLayout;
