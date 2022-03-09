import httpUtil from "../../../../utils/httpUtil";
import {
  WILLPAY,
  WILLDELIVERY,
  WILLRECEIVE,
  FINISHED,
  REFUNDED,
  ALLORDERS,
  WILLPAY_ORDER_MAX_TIME
} from '../../../../utils/constant'

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
    remarkTimer: {},
    isShowPay: false,
    remarks: {}
  },

  toChangeAddress() {
    wx.navigateTo({
      url: `/pages/person/pages/myAddress/index?select=${true}`,
    })
  },

  bindRemarkInput(e) {
    const that = this
    const { remarkTimer } = this.data
    const { value, commodityId } = e.detail
    remarkTimer[commodityId] && clearTimeout(remarkTimer[commodityId])
    remarkTimer[commodityId] = setTimeout(() => {
      const { remarks } = that.data
      remarks[commodityId] = value
      this.setData({
        remarks
      })
    }, 1000)
    this.setData({
      remarkTimer
    })
  },

  makeOrder(status) {
    // 获取下单时间
    const date = new Date()
    const year = date.getUTCFullYear()
    const month = date.getUTCMonth() + 1
    const day = date.getUTCDate()
    const hour = date.getHours()
    const min = date.getUTCMinutes()
    const second = date.getUTCSeconds()
    const addTime = `${year}-${month}-${day} ${hour}:${min}:${second}`
    // 获取地址id 获取备注
    const { defaultAddress: { _id: addressId }, remarks, commoditiesData } = this.data

    // 生成订单
    const newOrders = []
    commoditiesData.forEach(item => {
      item.commodities.forEach(commodity => {
        const order = {
          addressId,
          commodityId: commodity._id,
          number: commodity.number,
          heavy: commodity.heavy,
          price: commodity.price,
          totalPrice: (commodity.number * commodity.price).toFixed(2) * 1,
          addTime,
          remark: remarks[commodity._id] || "",
          status
        }
        newOrders.push(order)
      })
    })
    return httpUtil.addOrder({ newOrders })
  },

  toMakeOrder() {
    const { defaultAddress } = this.data
    if (!defaultAddress) {
      wx.showToast({
        title: '请选择地址',
        icon: "error"
      })
    } else {
      this.setData({
        isShowPay: true
      })
    }
  },

  confirmPay(status) {
    const that = this
    let { dataName, addressName, fromOrderWillPay, orderId } = this.data
    wx.showLoading()
    this.makeOrder(WILLDELIVERY)
      .then(res => {
        wx.hideLoading()
        wx.showToast({
          title: '支付成功',
          icon: "success",
          success() {
            if (fromOrderWillPay) {
              // 在待支付中删除该订单
              httpUtil.deleteOrder({ _id: orderId })
                .then(res => {
                  that.setData({
                    isShowPay: false
                  }, () => {
                    setTimeout(() => {
                      // 关闭倒计时器
                      clearInterval(wx.getStorageSync(`countDownTimer-${orderId}`))
                      // 清除定时器和时间的缓存
                      wx.setStorageSync(`countDownTime-${orderId}`, null)
                      wx.setStorageSync(`countDownTimer-${orderId}`, null)
                      // 清空数据缓存
                      wx.setStorageSync(dataName, null)
                      wx.setStorageSync(addressName, null)
                      wx.setStorageSync("confirmOrderData", null)
                      wx.setStorageSync("addressId", null)
                      wx.setStorageSync("hasFinishedOrder", true)
                      wx.redirectTo({
                        url: `/pages/person/pages/myOrder/index?active=${WILLDELIVERY}`,
                      })
                    }, 500)
                  })
                })
            } else {
              that.setData({
                isShowPay: false
              }, () => {
                setTimeout(() => {
                  // 清空缓存
                  wx.setStorageSync("confirmOrderData", null)
                  wx.setStorageSync("addressId", null)
                  wx.setStorageSync("hasFinishedOrder", true)
                  wx.navigateBack()
                }, 500)
              })
            }
          }
        })
      }, () => {
        wx.hideLoading()
        wx.showToast({
          title: '支付失败',
          icon: "error"
        })
      })
  },

  onClosePay() {
    const that = this
    const { fromOrderWillPay } = this.data
    wx.showModal({
      title: '提示',
      content: '确认取消支付吗',
      success(res) {
        if (res.confirm) {
          if (fromOrderWillPay) {
            that.setData({
              isShowPay: false
            })
            return
          }
          wx.showLoading({
            title: '加载中',
          })
          that.makeOrder(WILLPAY)
            .then(res => {
              wx.hideLoading()
              that.setData({
                isShowPay: false
              }, () => {
                wx.setStorageSync('confirmOrderData', null)
                wx.setStorageSync('addressId', null)
                wx.setStorageSync("hasFinishedOrder", true)
                wx.redirectTo({
                  url: `/pages/person/pages/myOrder/index?active=${WILLPAY}&fromCart=true`,
                })
              })
            })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { dataName = "confirmOrderData", addressName = "addressId", fromOrderWillPay = "false", orderId = "orderId" } = options
    this.setData({
      dataName,
      addressName,
      fromOrderWillPay: fromOrderWillPay === "true" ? true : false,
      orderId
    })
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
    let { defaultAddress, dataName, addressName } = this.data
    const data = wx.getStorageSync(dataName)
    if (!data) {
      return wx.showToast({
        title: '订单过期',
        icon: "error"
      })
    }
    this.setData({
      ...data
    })
    const addressId = wx.getStorageSync('addressId') || wx.getStorageSync(addressName)
    console.log(addressId);
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