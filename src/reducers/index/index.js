import { SETListLOADING, CHANGETABITEM, GETTOPICDETAIL, COLLECTTOPIC, DECOLLECTTOPIC, GETCOLLECTLIST } from '../../constants/index/index'
// import Taro from '@tarojs/taro'

const INDEX_STATE = {
  listLoading: false,
  tabList: [
    { key: 'all', tab: '全部' },
    { key: 'good', tab: '精华' },
    { key: 'share', tab: '分享' },
    { key: 'ask', tab: '问答' },
    { key: 'job', tab: '招聘' },
    { key: 'dev', tab: '客户端测试' }
  ],
  changetab: { key: 'all', tab: '全部' },
  searchData: {
    page: 1,
    tab: 'all',
    limit: 20,
    mdrender: true
  },
  dataList: [],
  dataDetail: {},
  collectList: []
}

export default function index (state = INDEX_STATE, action) {
  // Taro.hideLoading()
  switch (action.type) {
    case SETListLOADING:
      return {
        ...state,
        listLoading: action.listLoading,
      }
    case CHANGETABITEM:
      return {
        ...state,
        listLoading: false,
        changetab: action.data,
        searchData: action.searchData,
        dataList: action.dataList
      }
    case GETTOPICDETAIL:
      return {
        ...state,
        dataDetail: action.dataDetail
      }
    case COLLECTTOPIC:
      let dataDetail = state.dataDetail
      dataDetail.is_collect = action.is_collect
      return {
        ...state,
        dataDetail: dataDetail
      }
    case DECOLLECTTOPIC:
      let dedataDetail = state.dataDetail
      dedataDetail.is_collect = action.is_collect
      return {
        ...state,
        dataDetail: dedataDetail
      }
    case GETCOLLECTLIST:
      return {
        ...state,
        collectList: action.collectList
      }
    default:
      return state
  }
}