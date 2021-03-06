import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, Form, Input, Button, Row, Col } from "antd";

import { accesstoken, getmessagecount } from "../../actions/user/index";
import { getLocalStorage } from "../../utils/index";

class IndexMessage extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }
  
  UNSAFE_componentWillUpdate () {
    // 登录成功返回上一页
    if (getLocalStorage("token")) {
      this.props.getmessagecount({token: this.props.user.token || getLocalStorage("token")});
      this.goBack();
    }
  }

  UNSAFE_componentWillMount () {
    // 判断用户是否已登录
    if (getLocalStorage("token")) {
      this.goBack();
    }
  }

  // 表单提交
  onFinish (values) {
    this.props.accesstoken(values);
  }

  // 返回上一页
  goBack () {
    this.props.history.go(-1);
  }

  render() {
    return (
      <Card title="登录" style={{ height: "calc(100vh - 50px - 120px)" }}>
        <Form 
          wrapperCol={{ offset: 0, span: 24, }}
          onFinish={this.onFinish.bind(this)}
          style={{ width: "50%", margin: "0 auto" }}>
          <Form.Item
            name="token"
            label=""
            rules={[
              {
                required: true,
                message: "请输入token校验",
                type: "string"
              },
            ]}
          >
            <Input placeholder="accesstoken 登录校验" />
          </Form.Item>
          <Form.Item>
            <Row gutter={10}>
              <Col span={12}><Button loading={this.props.user.loginLoading} type="primary" htmlType="submit" style={{ width: "100%" }}>登录</Button></Col>
              <Col span={12}><Button loading={this.props.user.loginLoading} style={{ width: "100%" }} onClick={this.goBack.bind(this)}>取消</Button></Col>
            </Row>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

// 设置props参数
IndexMessage.propTypes = {
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  accesstoken: PropTypes.func.isRequired,
  getmessagecount: PropTypes.func.isRequired
};

const mapState = (state) => ({
  user: state.user
});

const mapDispatch = (dispatch) => ({
  accesstoken: (data) => dispatch(accesstoken(data)),
  getmessagecount: (data) => dispatch(getmessagecount(data))
});

export default connect(mapState, mapDispatch)(IndexMessage);