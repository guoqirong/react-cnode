import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, List, Avatar, Button } from "antd";
import PropTypes from "prop-types";
import HtmlCode from "../../components/htmlCode/index";

import { getmessagelist, getuserinfo, readallmessage, readonemessage } from "../../actions/user/index";
import { formatDate, getLocalStorage } from "../../utils/index";

import "./index.css";

class IndexMessage extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  UNSAFE_componentWillMount ()  {
    // 获取消息列表和用户信息
    if (this.props.user.token || getLocalStorage("token")) {
      this.props.getmessagelist({token: this.props.user.token || getLocalStorage("token")});
      this.props.getuserinfo({userName: this.props.user.loginname || getLocalStorage("userName")});
    } else {
      this.props.history.push("/");
    }
  }

  // 已读所有消息
  readAll () {
    this.props.readallmessage({token: this.props.user.token || getLocalStorage("token")});
  }

  // 已读一条消息
  readOne (id) {
    this.props.readonemessage({id: id, token: this.props.user.token || getLocalStorage("token")});
  }

  render() {
    return (
      <div className="message-list">
        <div style={{ width: "calc(100% - 300px)", display: "inline-block" }}>
          <Card
            style={{ width: "100%" }}
            extra={ this.props.user.messageList.hasnot_read_messages && this.props.user.messageList.hasnot_read_messages.length > 0 ? <Button type="primary" onClick={this.readAll.bind(this)} loading={this.props.user.messageListLoading}>全部已读</Button> : "" }
            title="未读信息"
          >
            <List
              itemLayout="vertical"
              size="small"
              loading={this.props.user.messageListLoading}
              locale={{ emptyText: "暂无数据" }}
              dataSource={this.props.user.messageList.hasnot_read_messages}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={item.author.avatar_url}>{item.author.loginname}</Avatar>
                    }
                    title={
                      <div>
                        <div className="message-title">{item.author.loginname + "回复了您的话题"}</div>
                        <Button className="message-button" onClick={this.readOne.bind(this, item.id)} type="primary" loading={this.props.user.messageListLoading}>已读</Button>
                      </div>
                    }
                    description={formatDate(item.create_at, "yyyy-MM-dd")}
                  />
                  <HtmlCode data={item.reply.content}></HtmlCode>
                  <div className="message-topic-title">话题：{item.topic.title}</div>
                </List.Item>
              )}
            />
          </Card>
          <Card
            style={{ width: "100%", marginTop: "10px" }}
            title="已读信息"
          >
            <List
              itemLayout="vertical"
              size="small"
              locale={{ emptyText: "暂无数据" }}
              loading={this.props.user.messageListLoading}
              dataSource={this.props.user.messageList.has_read_messages}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={item.author.avatar_url}>{item.author.loginname}</Avatar>
                    }
                    title={item.author.loginname + "回复了您的话题"}
                    description={formatDate(item.create_at, "yyyy-MM-dd")}
                  />
                  <HtmlCode className="reply-content" data={item.reply.content}></HtmlCode>
                  <div className="message-topic-title">话题：{item.topic.title}</div>
                </List.Item>
              )}
            />
          </Card>
        </div>
        <div className="right-list" style={{ width: 290, float: "right", display: "inline-block" }}>
          <Card title="" loading={this.props.user.userinfoLoading}>
            <div>
              <Avatar shape="square" size="large" src={this.props.user.userInfo.avatar_url} >{this.props.user.userInfo.loginname}</Avatar>
              <span style={{ marginLeft: "10px" }}>{this.props.user.userInfo.loginname}</span>
            </div>
            <div style={{ marginTop: "10px" }}>积分：{this.props.user.userInfo.score || ""}</div>
          </Card>
          <Card title="我的主题" className="my-topics-replies-card" loading={this.props.user.userinfoLoading} style={{ marginTop: "10px" }}>
            <List
              size="small"
              locale={{emptyText: "暂无数据"}}
              dataSource={this.props.user.userInfo.recent_topics}
              renderItem={item => <List.Item>{item.title}</List.Item>}
            />
          </Card> 
          <Card title="我的回复" className="my-topics-replies-card" loading={this.props.user.userinfoLoading} style={{ marginTop: "10px" }}>
            <List
              size="small"
              locale={{emptyText: "暂无数据"}}
              dataSource={this.props.user.userInfo.recent_replies}
              renderItem={item => <List.Item>{item.title}</List.Item>}
            />
          </Card>
          <Card title="客户端二维码" style={{ marginTop: "10px" }}>
            <img style={{ width: "100%" }} alt="二维码" src={require("../../assets/images/clientCode.png")}></img>
            <div style={{ textAlign:"center" }}>
              <a href="https://github.com/soliury/noder-react-native" rel="noopener noreferrer" target="_blank">客户端源码地址</a>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

// 设置props参数
IndexMessage.propTypes = {
  index: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  getmessagelist: PropTypes.func.isRequired,
  getuserinfo: PropTypes.func.isRequired,
  readallmessage: PropTypes.func.isRequired,
  readonemessage: PropTypes.func.isRequired
};

const mapState = (state) => ({
  index: state.index,
  user: state.user
});

const mapDispatch = (dispatch) => ({
  getmessagelist: (data) => dispatch(getmessagelist(data)),
  getuserinfo: (data) => dispatch(getuserinfo(data)),
  readallmessage: (data) => dispatch(readallmessage(data)),
  readonemessage: (data) => dispatch(readonemessage(data))
});

export default connect(mapState, mapDispatch)(IndexMessage);