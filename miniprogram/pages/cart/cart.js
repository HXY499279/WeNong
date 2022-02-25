import checkLogin from "../../utils/checkLogin"
import httpUtil from "../../utils/httpUtil"

// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0,
    loading: true,
    carts: [],
    selectedCommodities: [],
    sendData: [],
    totalPrice: 0,
    selectedAll: false,
    allBtn: false,
    timer: null
  },

  toMakeOrder() {
    const { carts, selectedCommodities } = this.data
    if (!selectedCommodities.length) {
      return wx.showToast({
        title: '还没选择商品哦',
        icon: "error"
      })
    }
    wx.showLoading({
      title: '加载中',
    })
    const commoditiesData = carts
    for (let [i, merchant] of Object.entries(commoditiesData)) {
      delete merchant.addTime
      merchant.commodities = []
      selectedCommodities.forEach(commodity => {
        if (commodity.merchantId === merchant.merchantInfo.openid) {
          merchant.commodities.push(commodity)
        }
      })
      if (merchant.commodities.length === 0) {
        commoditiesData.splice(i, 1)
      } else {
        merchant.merchantTotalPrice = merchant.commodities.reduce((a, b) => a + b.price * b.number, 0)
        merchant.merchantTotalNumber = merchant.commodities.reduce((a, b) => a + b.number, 0)
      }
    }
    const totalNumber = commoditiesData.reduce((a, b) => a + b.merchantTotalNumber, 0)
    const { totalPrice } = this.data
    const sendData = { commoditiesData, totalNumber, totalPrice }
    wx.setStorageSync('confirmOrderData', sendData)
    setTimeout(() => {
      wx.navigateTo({
        url: `/pages/cart/pages/makeOrder/index`,
        success() {
          wx.hideLoading()
        }
      })
    }, 500)
  },

  getTotalPrice() {
    const { selectedCommodities } = this.data
    const totalPrice = selectedCommodities.reduce((a, b) => a + b.price * b.number, 0).toFixed(2) * 1
    this.setData({ totalPrice })
  },

  onNumberChange(e) {
    const that = this
    const { carts, selectedCommodities } = this.data
    const { commodityId, number, merchantIndex, commodityIndex } = e.detail
    // 刷新本地数据
    carts[merchantIndex].commodities[commodityIndex].number = number
    selectedCommodities.forEach((item, i) => {
      if (item._id === commodityId) {
        selectedCommodities[i].number = number
      }
    })
    this.setData({ carts, selectedCommodities }, () => {
      that.getTotalPrice()
    })
    // 更改远程数据
    const { timer } = this.data
    timer && clearTimeout(timer)
    this.setData({
      timer: setTimeout(() => {
        httpUtil.changeCartInfo({ commodityId, newInfo: { number } })
          .then(res => {
          }, err => {
            wx.showToast({
              title: '失败',
              icon: "error"
            })
          })
      }, 1000)
    })

  },

  onSelectedCommodityChange(e) {
    const that = this
    const { value } = e.detail
    const { selectedCommodities, carts, total } = this.data
    const { merchantindex, commodityindex, commodityid } = e.currentTarget.dataset
    if (value) {
      selectedCommodities.push(carts[merchantindex].commodities[commodityindex])
      if (selectedCommodities.length === total) {
        this.setData({
          allBtn: true
        })
      }
    } else {
      selectedCommodities.forEach((item, i) => {
        if (item._id === commodityid) {
          selectedCommodities.splice(i, 1)
        }
      })
      this.setData({
        allBtn: false
      })
    }
    this.setData({
      selectedCommodities
    }, () => {
      that.getTotalPrice()
    })
  },

  onSelectedAllChange(e) {
    const that = this
    const { value } = e.detail
    let { selectedCommodities, carts } = this.data
    if (value) {
      selectedCommodities = []
      carts.forEach(item => {
        selectedCommodities = [...selectedCommodities, ...item.commodities]
      })
      this.setData({
        selectedAll: value
      })
    } else {
      selectedCommodities = []
      this.setData({
        selectedAll: value
      })
    }
    this.setData({
      selectedCommodities,
      allBtn: !this.data.allBtn
    }, () => {
      that.getTotalPrice()
    })
  },

  // 删除商品
  deleteCart(e) {
    const that = this
    const instance = this.selectAllComponents(".swipeCell")
    const { commodityid: commodityId, merchantindex, commodityindex } = e.currentTarget.dataset
    const { carts } = this.data
    instance[commodityindex].close()
    wx.showLoading({
      title: '加载中',
    })
    httpUtil.deleteCart({ commodityId })
      .then(res => {
        wx.hideLoading()
        wx.showToast({
          title: '删除成功',
          icon: "success",
          success() {
            carts[merchantindex].commodities.splice(commodityindex, 1)
            if (carts[merchantindex].commodities.length === 0) {
              carts.splice(merchantindex, 1)
            }
            that.setData({
              carts
            })
          }
        })
      }, err => {
        wx.hideLoading()
        wx.showToast({
          title: '删除失败',
          icon: "error"
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
  onShow() {
    this.getTabBar().setData({
      active: 2
    })
    checkLogin()
      .then(() => {
        httpUtil.getCartInfo()
          .then(res => {
            const { cartInfo: carts } = res.data
            console.log(carts);
            const total = carts.reduce((a, b) => a + b.commodities.length, 0)
            const tag = wx.getStorageSync('hasFinishedOrder')
            tag && this.setData({
              selectedCommodities: [],
              totalPrice: 0,
              selectedAll: false
            }, () => {
              wx.setStorageSync("hasFinishedOrder", false)
            })
            this.setData({
              total,
              loading: false,
              carts
            })
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