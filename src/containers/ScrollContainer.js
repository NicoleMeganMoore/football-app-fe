import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";

import "./ScrollContainer.scss";

export default class ScrollContainer extends Component {
  renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: `rgba(0,0,0,0.2)`,
      borderRadius: `4px`
    };
    return (
      <div
        className="thumb-horizontal"
        style={{ ...style, ...thumbStyle }}
        {...props}
      />
    );
  };

  render() {
    return (
      <Scrollbars
        // autoHeight
        className="custom-scrollbar"
        renderThumbHorizontal={this.renderThumb}
        {...this.props}
      >
        {this.props.children}
      </Scrollbars>
    );
  }
}
