import {
  SETLISTLOADING,
  SETDETAILLOADING,
  SETCOLLECTLISTLOADING,
  CHANGETABITEM,
  GETTOPICDETAIL,
  COLLECTTOPIC,
  DECOLLECTTOPIC,
  GETCOLLECTLIST
} from '../../constants/index/index'
import httpRequest from '../../utils/request'
import { API_TOPICS, API_TOPIC, API_TOPIC_COLLECT, API_TOPIC_DECOLLECT, API_TOPIC_COLLECTLIST } from '../../constants/api'

// 设置列表loading状态
export const setlistloading = (val) => {
  return {
    type: SETLISTLOADING,
    listLoading: val
  }
}
// 设置详情loading状态
export const setdetailloading = (val) => {
  return {
    type: SETDETAILLOADING,
    detailLoading: val
  }
}
// 设置收藏列表loading状态
export const setcollectlistloading = (val) => {
  return {
    type: SETCOLLECTLISTLOADING,
    collectListLoading: val
  }
}
// 保存数据修改
export const savedatachange = (resData) => {
  return resData
}
// 列表标签选中获取数据
export const changetabitem = (data) => {
  return dispatch => {
    dispatch(setlistloading(true))
    httpRequest({
      url: API_TOPICS,
      method: 'GET',
      params: {
        page: data.page || 1,
        tab: data.key,
        limit: 20,
        mdrender: true
      }
    }).then((res) => {
      let resData = {
        type: CHANGETABITEM,
        data: data,
        searchData: {
          page: data.page || 1,
          tab: data.key,
          limit: 20,
          mdrender: true
        },
        dataList: res.data
      }
      dispatch(savedatachange(resData))
    }).catch((e) => {
      console.log(e)
    })
  }
}
// 获取详情数据
export const gettopicdetail = (data) => {
  return dispatch => {
    dispatch(setdetailloading(true))
    httpRequest({
      url: API_TOPIC + data.id,
      method: 'GET',
      params: {
        accesstoken: data.token
      }
    }).then((res) => {
      let resData = {
        type: GETTOPICDETAIL,
        dataDetail: res.data
      }
      dispatch(savedatachange(resData))
    }).catch((e) => {
      console.log(e)
    })
  }
}
// 收藏主题
export const collecttopic = (data) => {
  return dispatch => {
    httpRequest({
      url: API_TOPIC_COLLECT,
      method: 'POST',
      data: {
        accesstoken: data.token,
        topic_id: data.id
      }
    }).then((res) => {
      let resData = {
        type: COLLECTTOPIC,
        is_collect: true
      }
      dispatch(savedatachange(resData))
    }).catch((e) => {
      console.log(e)
    })
  }
}
// 取消收藏主题
export const decollecttopic = (data) => {
  return dispatch => {
    httpRequest({
      url: API_TOPIC_DECOLLECT,
      method: 'POST',
      data: {
        accesstoken: data.token,
        topic_id: data.id
      }
    }).then((res) => {
      let resData = {
        type: DECOLLECTTOPIC,
        is_collect: false
      }
      dispatch(savedatachange(resData))
    }).catch((e) => {
      console.log(e)
    })
  }
}
// 获取收藏列表
export const getcollectlist = (data) => {
  return dispatch => {
    dispatch(setcollectlistloading(true))
    httpRequest({
      url: API_TOPIC_COLLECTLIST + data.userName,
      method: 'GET'
    }).then((res) => {
      let resData = {
        type: GETCOLLECTLIST,
        collectList: res.data
      }
      dispatch(savedatachange(resData))
    }).catch((e) => {
      console.log(e)
    })
  }
}