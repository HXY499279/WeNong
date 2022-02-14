import httpUtil from "../../../../../../utils/httpUtil"

// pages/person/pages/changePhone/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneTimer: null,
    codeTimer: null,
    phone: 0,
    trueCode: 1111,
    myCode: 0,
    canGetCode: true,
    downTime: 0
  },
  countDownStart() {
    const countDown = this.selectComponent('.control-count-down');
    countDown.start();
  },
  countDownFinished() {
    console.log(1111111111111);
    17749971890
    this.setData({
      canGetCode: true
    })
  },
  comfirmChangePhone() {
    const { phone, myCode } = this.data
    if (this.checkPhone(phone) && this.checkCode(myCode)) {
      wx.showLoading({
        title: '更换中...',
      })
      const phone = this.data.phone
      httpUtil.changeUserInfo({ newInfo: { phone } })
        .then(res => {
          this.setData({
            phone: 0
          })
          wx.hideLoading({
            success: () => {
              wx.showToast({
                title: res.message,
                icon: "success",
                duration: 1000
              })
              setTimeout(() => {
                wx.navigateBack()
              }, 1000)
            },
          })
        }, (err) => {
          wx.showToast({
            title: res.message,
            icon: "error"
          })
        })
    }
  },
  inputPhone(e) {
    // this.data.phoneTimer && clearTimeout(this.data.phoneTimer)
    // this.setData({
    //   phoneTimer: setTimeout(() => {
    //     this.setData({
    //       phone: e.detail.value
    //     })
    //   }, 800)
    // })
    this.setData({
      phone: e.detail.value
    })
  },
  inputCode(e) {
    // this.data.codeTimer && clearTimeout(this.data.codeTimer)
    // this.setData({
    //   codeTimer: setTimeout(() => {
    //     this.setData({
    //       myCode: e.detail.value
    //     })
    //   }, 800)
    // })
    this.setData({
      myCode: e.detail.value
    })
  },
  getCode(e) {
    const phone = this.data.phone
    if (this.checkPhone(phone)) {
      // 手机号输入无误，发送验证码
      // 设置四位正确验证码
      const trueCode = Math.floor(Math.random() * (9999 - 1000)) + 1000
      this.setData({
        trueCode,
        canGetCode: false
      })
      // 下放正确验证码
      wx.showToast({
        title: `验证码: ${trueCode}`,
        icon: 'success',
      })

      // 下放成功后设置时间并展示倒计时
      this.setData({
        downTime: 60000,
      }, () => {
        this.countDownStart()
      })
    }
  },
  checkPhone(phone) {
    const reg = /^1[34578]\d{9}$/
    if (!phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: "error"
      })
      return false
    } else if (reg.test(phone)) {
      return true
    } else {
      wx.showToast({
        title: '手机号格式错误',
        icon: "error"
      })
      return false
    }
  },
  checkCode(myCode) {
    const trueCode = this.data.trueCode
    if (myCode) {
      if (myCode == trueCode) {
        return true
      } else {
        wx.showToast({
          title: '验证码错误',
          icon: "error"
        })
        return false
      }
    } else {
      wx.showToast({
        title: '请输入验证码',
        icon: "error"
      })
      return false
    }
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