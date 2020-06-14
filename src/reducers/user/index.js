import { SETLOGINLOADING, SETUSERINFOLOADING, SETMESSAGELISTLOADING, SETTOKEN, ACCESSTOKEN, GETUSERINFO, GETMESSAGECOUNT, GETMESSAGELIST } from '../../constants/user/index'

const USER_STATE = {
  loginLoading: false,   // 登录加载状态
  userinfoLoading: false,   // 用户信息加载状态
  messageListLoading: false,   // 消息加载状态
  token: '',   // 登录校验
  simpleUserInfo: {},   // 简洁用户数据
  userInfo: {},   // 详细用户数据
  messageCount: 0,   // 用户信息数量
  messageList: {}   // 用户信息列表
}

export default function index (state = USER_STATE, action) {
  switch (action.type) {
    case SETLOGINLOADING:  // 设置登录loading状态
      return {
        ...state,
        loginLoading: action.loginLoading
      }
    case SETUSERINFOLOADING:  // 设置获取用户数据loading状态
      return {
        ...state,
        userinfoLoading: action.userinfoLoading
      }
    case SETMESSAGELISTLOADING:  // 设置获取消息列表loading状态
      return {
        ...state,
        messageListLoading: action.messageListLoading
      }
    case SETTOKEN:  // 设置登录token
      return {
        ...state,
        loginLoading: false,
        token: action.token
      }
    case ACCESSTOKEN:  // 登录token校验
      return {
        ...state,
        simpleUserInfo: action.data
      }
    case GETUSERINFO:  // 获取用户数据
      return {
        ...state,
        userinfoLoading: false,
        userInfo: action.data
      }
    case GETMESSAGECOUNT:  // 获取消息数量
      return {
        ...state,
        messageCount: action.data
      }
    case GETMESSAGELIST:  // 获取消息列表
      return {
        ...state,
        messageListLoading: false,
        messageList: action.data
      }
    default:
      return state
  }
}