import React, { Component } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import PropTypes from "prop-types";


class Router extends Component {
  render() {
    return window.__POWERED_BY_QIANKUN__ ? (
      <BrowserRouter basename={this.props.basename}>{ this.props.children }</BrowserRouter>
    ) : (
      <HashRouter basename={this.props.basename}>{ this.props.children }</HashRouter>
    );
  }
}

Router.propTypes = {
  children: PropTypes.any,
  basename: PropTypes.string,
};

export default Router;