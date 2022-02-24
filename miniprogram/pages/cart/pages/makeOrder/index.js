import httpUtil from "../../../../utils/httpUtil";

// pages/cart/pages/makeOrder/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    defaultAddress: "",
    commoditiesData: {},
    totalNumber: 0,
    totalPrice: 0,
    remark: "",
    remarkTimer: null,
    isShowPay: false
  },

  toChangeAddress() {
    wx.navigateTo({
      url: `/pages/person/pages/myAddress/index?select=${true}`,
    })
  },

  onRemarkInput(e) {
    const { remarkTimer } = this.data
    const { value } = e.detail
    remarkTimer && clearTimeout(remarkTimer)
    this.setData({
      remarkTimer: setTimeout(() => {
        console.log(value);
        this.setData({ remark: value })
      }, 1000)
    })
  },

  toMakeOrder() {
    const { defaultAddress } = this.data
    console.log(defaultAddress);
    if (!defaultAddress) {
      wx.showToast({
        title: '请选择地址',
        icon: "error"
      })
    }else{
      this.setData({
        isShowPay: true
      })
    }
  },

  comfirmPay() {
    wx.showLoading()
    setTimeout(() => {
      const that = this
      wx.hideLoading()
      wx.showToast({
        title: '支付成功',
        icon: "success",
        success() {
          setTimeout(() => {
            that.setData({
              isShowPay: false
            }, () => {
              setTimeout(() => {
                wx.setStorageSync('comfirmOrderData', null)
                wx.setStorageSync('addressId', null)
                wx.navigateBack()
              }, 500)
            })
          }, 500)
        }
      })
    }, 1000)
  },

  onClosePay() {
    const that = this
    wx.showModal({
      title: '提示',
      content: '确认取消支付吗',
      success() {
        that.setData({
          isShowPay: false
        })
      }
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
    let { defaultAddress } = this.data
    const data = wx.getStorageSync('comfirmOrderData')
    this.setData({
      ...data
    })
    const addressId = wx.getStorageSync('addressId') || undefined
    const query = addressId ? { _id: addressId } : { isDefault: 1 }
    httpUtil.getAddressInfo({ query })
      .then(res => {
        const { addressInfo } = res.data
        defaultAddress = addressInfo[0]
        wx.hideLoading()
        this.setData({
          loading: false,
          defaultAddress
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