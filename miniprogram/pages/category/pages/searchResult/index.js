import httpUtil from "../../../../utils/httpUtil";


Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromIndex: false,
    pageLoading: true,
    keyword: "",
    zh: [],
    xl: [],
    jg: [],
    desc: false,
    data: [],
    jgTag: 0
  },

  onTitleClick(e) {
    const i = e.detail.index
    let { data, desc, xl, jg, jgTag } = this.data
    if (i === 1 && !xl.length) {
      data.sort((a, b) => b.sales - a.sales)
      this.setData({
        xl: data,
        jgTag: 0
      })
    } else if (i === 2) {
      jgTag++
      jgTag >= 2 ? desc = !desc : 0
      desc ? data.sort((a, b) => b.price - a.price) : data.sort((a, b) => a.price - b.price)
      this.setData({
        desc,
        jg: data,
        jgTag
      })
    } else {
      this.setData({
        jgTag: 0
      })
    }

  },

  navBack() {
    wx.navigateBack()
  },

  onInput(e) {
    const { value } = e.detail
    const { fromIndex } = this.data
    if (!value && !fromIndex) {
      wx.navigateBack()
    }
  },

  search(keyword, itemName = "name") {
    const reg = new RegExp(keyword, "ig")
    const query = {}
    query[itemName] = {
      $regex: keyword,
      $options: "ig"
    }
    httpUtil.getCommodityInfo({ query })
      .then(res => {
        const data = res.data.commodityInfo
        console.log(data);
        wx.hideLoading()
        this.setData({
          pageLoading: false,
          zh: data,
          data
        })
      }, () => {
        wx.hideLoading()
      })
  },

  confirmSearch(e) {
    const { value } = e.detail
    wx.showLoading({
      title: '加载中',
    })
    httpUtil.addSearchHistory({ newInfo: { keyword: value } })
      .then(res => {
        this.search(value)
      })
  },

  toCommodity(e) {
    const { commodityid: commodityId } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/commodity/index?commodityId=${commodityId}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { keyword = "", itemName = "name", content = "" } = options
    let fromIndex = false
    content ? fromIndex = true : content = keyword
    this.setData({
      content,
      fromIndex
    })
    this.search(keyword, itemName)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})