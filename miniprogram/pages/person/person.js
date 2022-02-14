const { default: httpUtil } = require("../../utils/httpUtil")

Page({
  data: {
    userInfo: null,
    isLogin: false
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
  onShow() {
    this.getTabBar().setData({
      active: 3
    })
    const OPENID = wx.getStorageSync('hasLoginOPENID')
    if (OPENID) {
      this.setData({ isLogin: true })
      if (!this.data.userInfo) {
        httpUtil.getUserInfo({ OPENID })
          .then(res => {
            const userInfo = res.data.userInfo
            this.setData({ userInfo })
          })
      }
    } else {
      this.setData({ isLogin: false })
    }
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