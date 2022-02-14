Page({
  listData: {},
  data: {
    rankType: undefined,
    rankTypes: [{
      title: '实战排行',
      type: 'project'
    }, {
      title: '路径排行',
      type: 'path'
    }],
    rankPeriod: undefined,
    rankPeriods: [{
      title: '周',
      value: 'week'
    }, {
      title: '月',
      value: 'month'
    }],
    currentList: []
  },
  onLoad() {
    wx.request({
      url: 'https://qc9prx.api.cloudendpoint.cn/getRecommend',
      success: ({ data: { data } }) => {
        this.listData = data
        const rankPeriod = wx.getStorageSync('rankPeriod') || 'week'
        const rankType = wx.getStorageSync('rankType') || 'project'
        this.setData({ rankPeriod, rankType })
        this.changeCurrentList(rankType, rankPeriod)
      }
    })
  },
  changeCurrentList(rankType, periodType) {
    let currentList = [];
    if (rankType === 'project' && periodType === 'week') {
      currentList = this.listData.projectWeek;
    } else if (rankType === 'project' && periodType === 'month') {
      currentList = this.listData.projectMonth;
    } else if (rankType === 'path' && periodType === 'week') {
      currentList = this.listData.pathWeek;
    } else {
      currentList = this.listData.pathMonth;
    }
    this.setData({ currentList });
  },
  handleTabChange(e) {
    const rankType = e.currentTarget.dataset.type;
    const { rankPeriod } = this.data;
    this.setData({ rankType });
    wx.setStorageSync('rankType', rankType)
    this.changeCurrentList(rankType, rankPeriod);
  },
  handlePeriodChange(e) {
    const rankPeriod = e.currentTarget.dataset.type;
    const { rankType } = this.data;
    this.setData({ rankPeriod });
    wx.setStorageSync('rankPeriod', rankPeriod)
    this.changeCurrentList(rankType, rankPeriod);
  },
})