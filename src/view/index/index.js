import React, { Component } from "react";
import { Layout, Badge } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from "react-router-dom";
import { getLocalStorage } from "../../utils/index";
import { getmessagecount } from "../../actions/user/index";

import routes from "../../router/index";

import "./index.css";

const { Header, Content, Footer } = Layout;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  UNSAFE_componentWillMount ()  {
    // 获取用户消息数量
    if (this.props.user.token || getLocalStorage("token")) {
      this.props.getmessagecount({token: this.props.user.token || getLocalStorage("token")});
    }
  }

  // 退出登录
  goLoginOut () {
    localStorage.clear();
    window.history.go(0);
  }

  render() {
    return (
      <Router>
        <Layout id="components-layout-index">
          <Header style={{ width: "100%" }}>
            <div className="site-header">
              <img className="logo" src={ require("../../assets/icons/logo.svg") } alt="logo" />
              <span className="navbar-link navbar-noright-link">
                <span><Link to="/">首页</Link></span>
                {
                  this.props.user.token || getLocalStorage("token") ? <Badge dot={true} count={this.props.user.messageCount}>
                    <span><Link to="/message">消息</Link></span>
                  </Badge> : ""
                }
                {
                  this.props.user.token || getLocalStorage("token") ? <span><Link to="/collect">收藏</Link></span> : ""
                }
                <span><a href="https://github.com/guoqirong/react-cnode" rel="noopener noreferrer" target="_blank">GitHub仓库</a></span>
                {
                  this.props.user.token || getLocalStorage("token") ? <span><span onClick={this.goLoginOut.bind(this)}>退出</span></span> : <span><Link to="/login">登录</Link></span>
                }
              </span>
            </div>
          </Header>
          <Content className="site-layout" style={{ width: "90%", margin: "10px auto"}}>
            <div>
              <Switch>
                {
                  routes.map((route,key)=>{
                    if(route.exact){
                      return <Route key={key} exact path={route.path}
                        render={props => (
                          <route.component {...props} routes={route.routes} />
                        )}
                      />;
                    }else{
                      return <Route  key={key}  path={route.path}
                        render={props => (
                          <route.component {...props} routes={route.routes} />
                        )}
                      />;
                    }
                  })
                }
                <Redirect from="/*" to="/" />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center", backgroundColor: "#ffffff", color: "#ababab" }}>
            <div>CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</div>
            <div>CNode 社区版权归xxxxxx所有</div>
          </Footer>
        </Layout>
      </Router>
    );
  }
}

// 设置props参数
Index.propTypes = {
  user: PropTypes.object.isRequired,
  getmessagecount: PropTypes.func.isRequired
};

export default connect((state) => {
  return {
    user: state.user
  };
}, (dispatch) => {
  return {
    getmessagecount: (data) => dispatch(getmessagecount(data))
  };
})(Index);