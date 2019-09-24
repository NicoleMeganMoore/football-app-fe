import React from "react";
import Loader from "react-loader-spinner";

import "./FancyButton.scss";

const FancyButton = props => {
  return (
    <button
      className={`fancy-button ${props.className}`}
      onClick={props.onClick}
      type="submit"
    >
      {props.loading && (
        <Loader
          className="spinner-inline"
          type="TailSpin"
          color="rgba(255,255,255,0.8)"
          height={20}
          width={20}
        />
      )}
      {props.children}
    </button>
  );
};

export default FancyButton;
