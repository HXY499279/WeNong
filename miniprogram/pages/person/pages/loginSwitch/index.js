import httpUtil from '../../../../utils/httpUtil'

Page({
  data: {
    isAgree: false
  },
  comfirmAgree() {
    if (this.data.isAgree === false) {
      wx.showModal({
        title: '请阅读并同意以下协议',
        content: '为保障您的个人信息安全，使用登录功能需要您先阅读并同意《隐私政策》《用户服务协议》《用户授权协议》',
      }).then(res => {
        this.setData({ isAgree: true })
      }, err => {
        this.setData({ isAgree: false })
      })
    }
  },
  agreeChange() {
    this.setData({
      isAgree: !this.data.isAgree
    })
  },
  // 获取用户信息
  getUserInfo(e) {
    const { nickName = "", avatarUrl = "" } = e.detail.userInfo;
    this.wxLogin({ nickName, avatarUrl })
  },
  // 微信登录
  wxLogin(userInfo) {
    wx.showLoading({
      title: '登录中...',
    })
    wx.login({
      success(res) {
        if (res.code) {
          httpUtil.wxLogin({ code: res.code, userInfo })
            .then(res => {
              const { OPENID } = res.data
              wx.setStorageSync('hasLoginOPENID', OPENID)
              wx.navigateBack()
              wx.hideLoading()
            }, err => {
              wx.showToast({
                title: err.message,
                icon: 'error',
                duration: 2000
              })
            })
        }
      }
    })
  },
  // 短信验证码登录
  dxLogin() {

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