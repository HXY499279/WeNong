import httpUtil from "../../../../utils/httpUtil"

// pages/category/pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList: [],
    searchValue: ""
  },

  navBack() {
    wx.navigateBack()
  },

  toSearchResult(e) {
    const { keyword } = e.currentTarget.dataset
    wx.showLoading({
      title: "加载中"
    })
    httpUtil.addSearchHistory({ newInfo: { keyword } })
      .then(res => {
        wx.navigateTo({
          url: `/pages/category/pages/searchResult/index?keyword=${keyword}`,
          success() {
            wx.hideLoading()
          }
        })
      })
  },

  confirmSearch(e) {
    const that = this
    const { value } = e.detail
    wx.showLoading({
      title: "加载中"
    })
    httpUtil.addSearchHistory({ newInfo: { keyword: value } })
      .then(res => {
        wx.navigateTo({
          url: `/pages/category/pages/searchResult/index?keyword=${value}`,
          success() {
            wx.hideLoading()
          }
        })
      })

  },

  deleteSearchHistory() {
    httpUtil.deleteSearchHistory()
      .then(res => {
        this.setData({
          searchList: []
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // 将搜索框内容置空
    this.setData({
      searchValue: ""
    })
    httpUtil.getSearchHistoryInfo()
      .then(res => {
        console.log(res);
        const { searchMap } = res.data.searchHistoryInfo
        const searchList = []
        for (let [i, v] of Object.entries(searchMap)) {
          searchList.push({ keyword: i, time: v })
        }
        searchList.sort((a, b) => b.time - a.time)
        this.setData({
          searchList
        })
      })
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