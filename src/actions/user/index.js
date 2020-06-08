import {
  SETLOGINLOADING,
  SETUSERINFOLOADING,
  SETTOKEN,
  ACCESSTOKEN,
  GETUSERINFO,
  GETMESSAGECOUNT,
  GETMESSAGELIST
} from '../../constants/user/index'
import httpRequest from '../../utils/request'
import { setLocalStorage } from '../../utils/index'
import { API_ACCESSTOKEN, API_USER, API_MESSAGE_COUNT, API_MESSAGE, API_MESSAGE_MARKONE, API_MESSAGE_MARKALL } from '../../constants/api'

export const setloginloading = (val) => {
  return {
    type: SETLOGINLOADING,
    loginLoading: val
  }
}
export const setuserinfoloading = (val) => {
  return {
    type: SETUSERINFOLOADING,
    userinfoLoading: val
  }
}
export const settoken = (data) => {
  return {
    type: SETTOKEN,
    token: data.token
  }
}
export const setUserData = (data) => {
  return data
}
export const accesstoken = (data) => {
  return dispatch => {
    dispatch(setloginloading(true))
    httpRequest({
      url: API_ACCESSTOKEN,
      method: 'POST',
      data: {
        accesstoken: data.token
      }
    }).then((res) => {
      let resData = {
        type: ACCESSTOKEN,
        data: res
      }
      if (res.success) {
        setLocalStorage('token', data.token)
        setLocalStorage('userName', res.loginname)
        dispatch(setUserData(resData))
      }
    }).catch((e) => {
      dispatch(setloginloading(false))
      console.log(e)
    })
  }
}
export const getuserinfo = (data) => {
  return dispatch => {
    dispatch(setuserinfoloading(true))
    httpRequest({
      url: API_USER + data.userName,
      method: 'GET'
    }).then((res) => {
      let resData = {
        type: GETUSERINFO,
        data: res.data
      }
      dispatch(setUserData(resData))
    }).catch((e) => {
      console.log(e)
    })
  }
}
export const getmessagecount = (data) => {
  return dispatch => {
    httpRequest({
      url: API_MESSAGE_COUNT,
      method: 'GET',
      params: {
        accesstoken: data.token
      }
    }).then((res) => {
      let resData = {
        type: GETMESSAGECOUNT,
        data: res.success ? res.data : res
      }
      dispatch(setUserData(resData))
    }).catch((e) => {
      console.log(e)
    })
  }
}
export const getmessagelist = (data) => {
  return dispatch => {
    httpRequest({
      url: API_MESSAGE,
      method: 'GET',
      data: {
        accesstoken: data.token,
        mdrender: true
      }
    }).then((res) => {
      let resData = {
        type: GETMESSAGELIST,
        data: res
      }
      dispatch(setUserData(resData))
    }).catch((e) => {
      console.log(e)
    })
  }
}
export const readonemessage = (data) => {
  return dispatch => {
    httpRequest({
      url: API_MESSAGE_MARKONE + data.id,
      method: 'POST',
      data: {
        accesstoken: data.token
      }
    }).then((res) => {
      dispatch(getmessagelist({token: data.token}))
    }).catch((e) => {
      console.log(e)
    })
  }
}
export const readallmessage = (data) => {
  return dispatch => {
    httpRequest({
      url: API_MESSAGE_MARKALL,
      method: 'POST',
      data: {
        accesstoken: data.token
      }
    }).then((res) => {
      dispatch(getmessagelist({token: data.token}))
    }).catch((e) => {
      console.log(e)
    })
  }
}