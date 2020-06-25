import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, PageHeader, Tag, Button, Avatar } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import HtmlCode from "../../components/htmlCode/index";

import { gettopicdetail, collecttopic, decollecttopic } from "../../actions/index/index";
import { formatDate, getLocalStorage } from "../../utils/index";

import "./index.css";

class IndexDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  UNSAFE_componentWillMount () {
    // 获取详情数据
    this.props.gettopicdetail({id: this.props.history.location.search.substr(1, this.props.history.location.search.length), token: getLocalStorage("token")});
  }

  // 主题收藏和取消收藏
  collectClick(id, is_collect) {
    if (is_collect) {
      this.props.decollecttopic({id: id, token: getLocalStorage("token")});
    } else {
      this.props.collecttopic({id: id, token: getLocalStorage("token")});
    }
  }

  // 返回上一页
  goBack () {
    this.props.history.go(-1);
  }
  
  render() {
    return (
      <div className="detail-list">
        <div style={{ width: "calc(100% - 300px)", display: "inline-block" }}>
          <Card
            style={{ width: "100%" }}
            loading={this.props.index.detailLoading}
            cover={
              <PageHeader
                className="site-page-header"
                onBack={this.goBack.bind(this)}
                title="话题详情"
              />
            }
          >
            <span className="my-topic-title">
              <div className="detail-topic-title">
                <div className="title-left">
                  <div className="topic-title-tab" style={{"width": !this.props.index.dataDetail.top && this.props.index.dataDetail.tab === "dev" ? "" : "40px"}}>
                    <Tag effect="dark" color={this.props.index.dataDetail.top ? "red" : "green"}>
                      {this.props.index.dataDetail.top ? "置顶" : this.props.index.dataDetail.tab === "good" ? "精华" : this.props.index.dataDetail.tab === "share" ? "分享" : this.props.index.dataDetail.tab === "ask" ? "问答" : this.props.index.dataDetail.tab === "job" ? "招聘" : this.props.index.dataDetail.tab === "dev" ? "客户端测试" : "全部"}
                    </Tag>
                  </div>
                  <div className="title-name" style={{"width": !this.props.index.dataDetail.top && this.props.index.dataDetail.tab === "dev" ? "" : "calc(100% - 50px)"}}>{this.props.index.dataDetail.title}</div>
                  <div className="topic-title-desc">{"● " + formatDate((this.props.index.dataDetail.create_at || ""), "yyyy-MM-dd") + " ● " + (this.props.index.dataDetail.author && this.props.index.dataDetail.author.loginname ? this.props.index.dataDetail.author.loginname : "")}</div>
                </div>
                <div className="title-right">
                  <Button type={this.props.index.dataDetail.is_collect ? "primary" : ""} onClick={this.collectClick.bind(this, this.props.index.dataDetail.id, this.props.index.dataDetail.is_collect)} shape="circle" icon={<HeartOutlined />} />
                </div>
              </div>
            </span>
            <HtmlCode className="topic-content" data={this.props.index.dataDetail.content}></HtmlCode>
          </Card>
          {
            this.props.index.dataDetail.replies && this.props.index.dataDetail.replies.length > 0 ? <Card
              style={{ width: "100%", marginTop: "10px" }}
              loading={this.props.index.detailLoading}
              title="回复"
            >
              {
                this.props.index.dataDetail.replies.map((item, i) => {
                  return (
                    <div className="replie-item" key={i}>
                      <div className="replie-user-img">
                        <Avatar src={item.author.avatar_url} shape="square" >{item.author.loginname}</Avatar>
                      </div>
                      <div className="replie-title">{item.author.loginname + "回复了您的话题"}</div>
                      <div className="replie-desc">{formatDate(item.create_at, "yyyy-MM-dd")}</div>
                      <div className="replie-content">
                        <HtmlCode className="replie-content" data={item.content}></HtmlCode>
                      </div>
                    </div>
                  );
                })
              }
            </Card> : ""
          }
        </div>
        <div style={{ width: 290, float: "right", display: "inline-block" }}>
          <Card
            title="作者"
            loading={this.props.index.detailLoading}
          >
            <Avatar shape="square" size="large" src={this.props.index.dataDetail.author && this.props.index.dataDetail.author.avatar_url ? this.props.index.dataDetail.author.avatar_url : ""}>{this.props.index.dataDetail.author && this.props.index.dataDetail.author.loginname ? this.props.index.dataDetail.author.loginname : ""}</Avatar>
            <span style={{ marginLeft: "10px" }}>{this.props.index.dataDetail.author && this.props.index.dataDetail.author.loginname ? this.props.index.dataDetail.author.loginname : ""}</span>
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
IndexDetail.propTypes = {
  index: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  gettopicdetail: PropTypes.func.isRequired,
  collecttopic: PropTypes.func.isRequired,
  decollecttopic: PropTypes.func.isRequired
};

const mapState = (state) => ({
  index: state.index
});

const mapDispatch = (dispatch) => ({
  gettopicdetail: (data) => dispatch(gettopicdetail(data)),
  collecttopic: (data) => dispatch(collecttopic(data)),
  decollecttopic: (data) => dispatch(decollecttopic(data))
});

export default connect(mapState, mapDispatch)(IndexDetail);