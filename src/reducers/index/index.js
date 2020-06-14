import { SETLISTLOADING, SETDETAILLOADING, SETCOLLECTLISTLOADING, CHANGETABITEM, GETTOPICDETAIL, COLLECTTOPIC, DECOLLECTTOPIC, GETCOLLECTLIST } from '../../constants/index/index'

const INDEX_STATE = {
  listLoading: false,    // 列表加载状态
  detailLoading: false,    // 详情加载状态
  collectListLoading: false,    // 收藏列表加载状态
  tabList: [    // 列表标签
    { key: 'all', tab: '全部' },
    { key: 'good', tab: '精华' },
    { key: 'share', tab: '分享' },
    { key: 'ask', tab: '问答' },
    { key: 'job', tab: '招聘' },
    { key: 'dev', tab: '客户端测试' }
  ],
  changetab: { key: 'all', tab: '全部' },    // 选中标签
  searchData: {    // 搜索条件数据
    page: 1,
    tab: 'all',
    limit: 20,
    mdrender: true
  },
  dataList: [],    // 列表数据
  dataDetail: {},    // 详情数据
  collectList: []    // 收藏列表数据
}

export default function index (state = INDEX_STATE, action) {
  switch (action.type) {
    case SETLISTLOADING: // 设置列表loading状态
      return {
        ...state,
        listLoading: action.listLoading,
      }
    case SETDETAILLOADING: // 设置详情loading状态
      return {
        ...state,
        detailLoading: action.detailLoading,
      }
    case SETCOLLECTLISTLOADING:  // 设置收藏列表loading状态
      return {
        ...state,
        collectListLoading: action.collectListLoading,
      }
    case CHANGETABITEM:  // 设置列表标签选中获取数据
      return {
        ...state,
        listLoading: false,
        changetab: action.data,
        searchData: action.searchData,
        dataList: action.dataList
      }
    case GETTOPICDETAIL:  // 设置详情数据
      return {
        ...state,
        detailLoading: false,
        dataDetail: action.dataDetail
      }
    case COLLECTTOPIC:  // 收藏主题
      let dataDetail = state.dataDetail
      dataDetail.is_collect = action.is_collect
      return {
        ...state,
        dataDetail: dataDetail
      }
    case DECOLLECTTOPIC:  // 取消收藏主题
      let dedataDetail = state.dataDetail
      dedataDetail.is_collect = action.is_collect
      return {
        ...state,
        dataDetail: dedataDetail
      }
    case GETCOLLECTLIST:  // 设置收藏列表
      return {
        ...state,
        collectListLoading: false,
        collectList: action.collectList
      }
    default:
      return state
  }
}