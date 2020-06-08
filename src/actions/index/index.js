import {
  SETListLOADING,
  CHANGETABITEM,
  GETTOPICDETAIL,
  COLLECTTOPIC,
  DECOLLECTTOPIC,
  GETCOLLECTLIST
} from '../../constants/index/index'
import httpRequest from '../../utils/request'
import { API_TOPICS, API_TOPIC, API_TOPIC_COLLECT, API_TOPIC_DECOLLECT, API_TOPIC_COLLECTLIST } from '../../constants/api'

export const setlistloading = (val) => {
  return {
    type: SETListLOADING,
    listLoading: val
  }
}
export const savedatachange = (resData) => {
  return resData
}
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
export const gettopicdetail = (data) => {
  return dispatch => {
    httpRequest({
      url: API_TOPIC + data.id,
      method: 'GET',
      data: {
        accesstoken: data.token
      }
    }).then((res) => {
      let resData = {
        type: GETTOPICDETAIL,
        dataDetail: res
      }
      dispatch(savedatachange(resData))
    }).catch((e) => {
      console.log(e)
    })
  }
}
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
export const getcollectlist = (data) => {
  return dispatch => {
    httpRequest({
      url: API_TOPIC_COLLECTLIST + data.userName,
      method: 'GET'
    }).then((res) => {
      let resData = {
        type: GETCOLLECTLIST,
        collectList: res
      }
      dispatch(savedatachange(resData))
    }).catch((e) => {
      console.log(e)
    })
  }
}