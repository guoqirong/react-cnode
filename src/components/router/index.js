import React, { Component } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import PropTypes from "prop-types";


class Router extends Component {
  render() {
    const basename = window.__POWERED_BY_QIANKUN__ ? ((this.props.parentName === "umi-qiankun" ? "/#" : "") + "/react-cnode") : "/";
    
    return this.props.parentName === "umi-qiankun" && window.__POWERED_BY_QIANKUN__ ? (
      <BrowserRouter basename={basename}>{ this.props.children }</BrowserRouter>
    ) : (
      <HashRouter basename={basename}>{ this.props.children }</HashRouter>
    );
  }
}

Router.propTypes = {
  children: PropTypes.any,
  parentName: PropTypes.string,
};

export default Router;