import httpUtil from "../../../../utils/httpUtil"

// pages/person/pages/myAddress/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addresses: [],
    loading: true,
    select: false
  },

  toAddMyAddress() {
    wx.navigateTo({
      url: `/pages/person/pages/myAddress/pages/editMyAddress/index?isEdit=${false}`,
    })
  },

  toEditMyAddress(e) {
    const { _id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/person/pages/myAddress/pages/editMyAddress/index?isEdit=${true}&_id=${_id}`,
    })
  },

  async swmrAddress(e) {
    const that = this
    const instance = this.selectAllComponents(".swipeCell")
    const { _id, selectedindex } = e.currentTarget.dataset
    const defaultAddressArr = this.data.addresses.filter(address => {
      if (address.isDefault === 1) {
        return address
      }
    })
    wx.showLoading({
      title: '设置中',
    })
    try {
      const defaultAddress = defaultAddressArr[0]
      const defaultAddress_id = defaultAddress?._id
      defaultAddress_id ? await httpUtil.changeAddressInfo({ _id: defaultAddress_id, newInfo: { isDefault: 0 } }) : 0
      await httpUtil.changeAddressInfo({ _id, newInfo: { isDefault: 1 } })
      // 刷新本地数据
      const { addresses } = that.data
      addresses.forEach((address, i) => {
        address._id === defaultAddress_id ? addresses[i].isDefault = 0 : 0
        address._id === _id ? addresses[i].isDefault = 1 : 0
      })
      that.setData({
        addresses
      })
      wx.hideLoading()
      wx.showToast({
        title: '设置成功',
        icon: "success",
      })
      instance[selectedindex].close()
    } catch (error) {
      wx.hideLoading()
      wx.showToast({
        title: '设置失败',
        icon: "error"
      })
      instance[selectedindex].close()
    }
  },

  deleteAddress(e) {
    const that = this
    const instance = this.selectAllComponents(".swipeCell")
    const { _id, selectedindex } = e.currentTarget.dataset
    wx.showModal({
      title: '提示',
      content: '确认删除该地址吗？',
      success() {
        wx.showLoading({
          title: '删除中',
        })
        instance[selectedindex].close()
        httpUtil.deleteAddress({ _id })
          .then(res => {
            wx.hideLoading()
            wx.showToast({
              title: '删除成功',
              icon: "success"
            })
            const { addresses } = that.data
            addresses.forEach((address, i) => {
              address._id === _id ? addresses.splice(i, 1) : 0
            })
            that.setData({
              addresses
            })
          }, (err) => {
            wx.hideLoading()
            wx.showToast({
              title: '删除失败',
              icon: "error"
            })
            instance[selectedindex].close()
          })
      }
    })
  },

  selectAddress(e) {
    const { addressid } = e.currentTarget.dataset
    wx.setStorageSync('addressId', addressid)
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { select } = options
    if (select === 'true') {
      this.setData({
        select: true
      })
    }
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
    httpUtil.getAddressInfo()
      .then(res => {
        console.log(res);
        this.setData({
          addresses: res.data.addressInfo,
          loading: false
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