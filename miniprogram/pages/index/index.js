Page({
  data: {
    showIcon: true,
    swiperList: [],
    courses: [],
    activities: [],
    searchList: null,
    type: "recommend",
    tabs: [
      { name: "推荐", type: "recommend" },
      { name: "路径", type: "path" },
      { name: "实战", type: "project" },
      { name: "活动", type: "activity" }
    ]
  },
  onLoad() {
    wx.request({
      url: 'https://qc9prx.api.cloudendpoint.cn/getData',
      success: ({ data }) => {
        const { swiperList, courses, activities } = data.data
        this.setData({
          swiperList,
          courses,
          activities
        })
      }
    })
  },
  onShow() {
    this.getTabBar().setData({
      active: 0
    })
  },
  handleInputChange(e) {
    const value = e.detail.value;
    let searchList = null
    if (value) {
      searchList = this.data.courses.filter(item => {
        if (item.title.search(new RegExp(value, "i")) !== -1) {
          return item
        }
      })
    }
    this.setData({
      showIcon: value ? false : true,
      searchList
    })
  },
  changeType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({ type });
  },
  handleCourseTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  }
})