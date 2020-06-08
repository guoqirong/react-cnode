import { SETLOGINLOADING, SETUSERINFOLOADING, SETTOKEN, ACCESSTOKEN, GETUSERINFO, GETMESSAGECOUNT, GETMESSAGELIST } from '../../constants/user/index'

const USER_STATE = {
  loginLoading: false,
  userinfoLoading: false,
  token: '',
  simpleUserInfo: {},
  userInfo: {},
  messageCount: 0,
  messageList: {}
}

export default function index (state = USER_STATE, action) {
  // Taro.hideLoading()
  switch (action.type) {
    case SETLOGINLOADING:
      return {
        ...state,
        loginLoading: action.loginLoading
      }
    case SETUSERINFOLOADING:
      return {
        ...state,
        userinfoLoading: action.userinfoLoading
      }
    case SETTOKEN:
      return {
        ...state,
        loginLoading: false,
        token: action.token
      }
    case ACCESSTOKEN:
      return {
        ...state,
        simpleUserInfo: action.data
      }
    case GETUSERINFO:
      return {
        ...state,
        userinfoLoading: false,
        userInfo: action.data
      }
    case GETMESSAGECOUNT:
      return {
        ...state,
        messageCount: action.data
      }
    case GETMESSAGELIST:
      return {
        ...state,
        messageList: action.data
      }
    default:
      return state
  }
}