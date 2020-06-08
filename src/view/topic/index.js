import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, List, Avatar, Tag, Pagination } from 'antd';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import { getLocalStorage } from '../../utils/index'
import { changetabitem } from '../../actions/index/index'
import { getuserinfo } from '../../actions/user/index'
import { formatDate } from '../../utils/index'

import './index.css'

class IndexTopic extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  UNSAFE_componentWillMount ()  {
    let changetab = { key: 'all', name: '全部' };
    this.props.changetabitem(changetab);
    if (this.props.user.loginname || getLocalStorage('userName')) {
      this.props.getuserinfo({userName: this.props.user.loginname || getLocalStorage('userName')});
    }
  }

  onTabChange (key) {
    let changetab = {};
    for (let i = 0; i < this.props.index.tabList.length; i++) {
      if (this.props.index.tabList[i].key === key) changetab = this.props.index.tabList[i];
    }
    this.props.changetabitem(changetab);
  }

  onItemClick (val) {
    console.log(val)
  }

  onChangePage (val) {
    let obj = this.props.index.searchData;
    obj.page = val;
    this.props.changetabitem(obj);
  }

  render() {
    return (
      <div className="topic-list">
        <Card
          size="small"
          style={{ width: 'calc(100% - 300px)', display: 'inline-block' }}
          tabList={this.props.index.tabList}
          activeTabKey={this.state.noTitleKey}
          onTabChange={key => {
            this.onTabChange(key);
          }}
        >
          <List
            size="small"
            style={{ width: '100%' }}
            dataSource={this.props.index.dataList}
            loading={this.props.index.listLoading}
            footer={
              <div>
                <Pagination current={this.props.index.searchData.page} onChange={this.onChangePage.bind(this)} defaultPageSize={this.props.index.searchData.limit} total={400} showSizeChanger={false} />
              </div>
            }
            renderItem={item => (
              <List.Item
                key={item.title}
                className="item-body"
                style={{ width: '100%' }}
                onClick={this.onItemClick.bind(this, item)}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.author.avatar_url} shape="square" >{item.author.loginname}</Avatar>}
                  title={
                    <div>
                      <div className="reply-count">
                        <span className="count-of-replies" title="回复数">{item.reply_count}</span>
                        <span>/</span>
                        <span className="count-of-visits" title="点击数">{item.visit_count}</span>
                      </div>
                      <div className="topic-tab" style={{width: !item.top && item.tab === 'dev' ? '' : '50px'}}>
                        <Tag effect="dark" color={item.top ? 'red' : 'green'}>
                          {item.top ? '置顶' : item.tab === 'good' ? '精华' : item.tab === 'share' ? '分享' : item.tab === 'ask' ? '问答' : item.tab === 'job' ? '招聘' : item.tab === 'dev' ? '客户端测试' : '全部'}
                        </Tag>
                      </div>
                      <div className="topic-title" title="item.title" style={{width: !item.top && item.tab === 'dev' ? '' : 'calc(100% - 60px - 50px - 90px)'}}>{item.title}</div>
                      <div className="created-time">{formatDate(item.create_at, 'yyyy-MM-dd')}</div>
                    </div>
                  }
                ></List.Item.Meta>
              </List.Item>
            )}
          ></List>
        </Card>
        <div className="right-list" style={{ width: 290, float: "right", display: 'inline-block' }}>
          {
            this.props.user.token || getLocalStorage('token') ?
            <Card title="" loading={this.props.user.userinfoLoading}>
              <div>
                <Avatar shape="square" size="large" src={this.props.user.userInfo.avatar_url} >{this.props.user.userInfo.loginname}</Avatar>
                <span style={{ marginLeft: '10px' }}>{this.props.user.userInfo.loginname}</span>
              </div>
              <div style={{ marginTop: '10px' }}>积分：{this.props.user.userInfo.score || ''}</div>
            </Card> : <Card title="CNode：Node.js专业中文社区">
              <span className="not-bottom">当前为游客状态，您可以 </span>
              <Link to="/login">登录</Link>
            </Card>
          }
          {
            this.props.user.token || getLocalStorage('token') ? <Card title="我的主题" className="my-topics-replies-card" loading={this.props.user.userinfoLoading} style={{ marginTop: '10px' }}>
              <List
                size="small"
                locale={{emptyText: '暂无数据'}}
                dataSource={this.props.user.userInfo.recent_topics}
                renderItem={item => <List.Item>{item.title}</List.Item>}
              />
            </Card> : ''
          }
          {
            this.props.user.token || getLocalStorage('token') ? <Card title="我的回复" className="my-topics-replies-card" loading={this.props.user.userinfoLoading} style={{ marginTop: '10px' }}>
              <List
                size="small"
                locale={{emptyText: '暂无数据'}}
                dataSource={this.props.user.userInfo.recent_replies}
                renderItem={item => <List.Item>{item.title}</List.Item>}
              />
            </Card> : ''
          }
          <Card title="客户端二维码" style={{ marginTop: '10px' }}>
            <img style={{ width: '100%' }} alt="二维码" src={require('../../assets/images/clientCode.png')}></img>
            <div style={{ textAlign:"center" }}>
              <a href="https://github.com/soliury/noder-react-native" rel="noopener noreferrer" target="_blank">客户端源码地址</a>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

IndexTopic.propTypes = {
  index: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  changetabitem: PropTypes.func.isRequired,
  getuserinfo: PropTypes.func.isRequired
}

const mapState = (state) => ({
  index: state.index,
  user: state.user
})

const mapDispatch = (dispatch) => ({
  changetabitem: (data) => dispatch(changetabitem(data)),
  getuserinfo: (data) => dispatch(getuserinfo(data))
})

export default connect(mapState, mapDispatch)(IndexTopic);