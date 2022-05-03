import {
  SETLOGINLOADING,
  SETUSERINFOLOADING,
  SETMESSAGELISTLOADING,
  SETTOKEN,
  ACCESSTOKEN,
  GETUSERINFO,
  GETMESSAGECOUNT,
  GETMESSAGELIST
} from "../../constants/user/index";
import httpRequest from "../../utils/request";
import { setLocalStorage } from "../../utils/index";
import { API_ACCESSTOKEN, API_USER, API_MESSAGE_COUNT, API_MESSAGE, API_MESSAGE_MARKONE, API_MESSAGE_MARKALL } from "../../constants/api";

// 设置登录loading状态
export const setloginloading = (val) => {
  return {
    type: SETLOGINLOADING,
    loginLoading: val
  };
};
// 设置获取用户数据loading状态
export const setuserinfoloading = (val) => {
  return {
    type: SETUSERINFOLOADING,
    userinfoLoading: val
  };
};
// 设置获取消息列表loading状态
export const setmessagelistloading = (val) => {
  return {
    type: SETMESSAGELISTLOADING,
    messageListLoading: val
  };
};
// 设置登录token
export const settoken = (data) => {
  return {
    type: SETTOKEN,
    token: data.token
  };
};
// 设置用户数据
export const setUserData = (data) => {
  return data;
};
// 登录token校验
export const accesstoken = (data) => {
  return dispatch => {
    dispatch(setloginloading(true));
    httpRequest({
      url: API_ACCESSTOKEN,
      method: "POST",
      data: {
        accesstoken: data.token
      }
    }).then((res) => {
      let resData = {
        type: ACCESSTOKEN,
        data: res
      };
      if (res.success) {
        setLocalStorage("token", data.token);
        setLocalStorage("loginname", res.loginname);
        dispatch(setUserData(resData));
      }
    }).catch((e) => {
      dispatch(setloginloading(false));
      console.log(e);
    });
  };
};
// 获取用户数据
export const getuserinfo = (data) => {
  return dispatch => {
    dispatch(setuserinfoloading(true));
    httpRequest({
      url: API_USER + data.userName,
      method: "GET"
    }).then((res) => {
      let resData = {
        type: GETUSERINFO,
        data: res.data
      };
      dispatch(setUserData(resData));
    }).catch((e) => {
      console.log(e);
    });
  };
};
// 获取消息数量
export const getmessagecount = (data) => {
  return dispatch => {
    httpRequest({
      url: API_MESSAGE_COUNT,
      method: "GET",
      params: {
        accesstoken: data.token
      }
    }).then((res) => {
      let resData = {
        type: GETMESSAGECOUNT,
        data: res.success ? res.data : res
      };
      dispatch(setUserData(resData));
    }).catch((e) => {
      console.log(e);
    });
  };
};
// 获取消息列表
export const getmessagelist = (data) => {
  return dispatch => {
    dispatch(setmessagelistloading(true));
    httpRequest({
      url: API_MESSAGE,
      method: "GET",
      params: {
        accesstoken: data.token,
        mdrender: true
      }
    }).then((res) => {
      let resData = {
        type: GETMESSAGELIST,
        data: res.data
      };
      dispatch(setUserData(resData));
    }).catch((e) => {
      console.log(e);
    });
  };
};
// 设置已读一条消息
export const readonemessage = (data) => {
  return dispatch => {
    httpRequest({
      url: API_MESSAGE_MARKONE + data.id,
      method: "POST",
      data: {
        accesstoken: data.token
      }
    }).then(() => {
      dispatch(getmessagelist({token: data.token}));
    }).catch((e) => {
      console.log(e);
    });
  };
};
// 设置已读全部消息
export const readallmessage = (data) => {
  return dispatch => {
    httpRequest({
      url: API_MESSAGE_MARKALL,
      method: "POST",
      data: {
        accesstoken: data.token
      }
    }).then(() => {
      dispatch(getmessagelist({token: data.token}));
    }).catch((e) => {
      console.log(e);
    });
  };
};