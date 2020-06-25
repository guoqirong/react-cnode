import React, { Component } from "react";
import { Spin } from "antd";
import PropTypes from "prop-types";

class Loading extends Component {
  render() {
    return (
      <div style={{width: "90vw", height: "80vh"}}>
        <Spin tip="Loading..." size="large" style={{width: "90vw", height: "80vh"}}>
          { this.props.children }
        </Spin>
      </div>
    );
  }
}

Loading.propTypes = {
  children: PropTypes.any
};

export default Loading;