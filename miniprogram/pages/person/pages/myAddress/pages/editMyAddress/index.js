import httpUtil from "../../../../../../utils/httpUtil";

// pages/person/pages/myAddress/pages/editMyAddress/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editAddress: null,
    isEdit: null,
    city: ['待选择', '待选择', '待选择'],
    customItem: '待选择',
  },

  async bindFormSubmit(e) {
    const that = this
    const data = e.detail.value
    // 处理city
    let cities = data.city.join('')
    // 检查是否有空
    const newData = { ...data, city: cities }
    for (let [i, v] of Object.entries(newData)) {
      if (i !== "isDefault" && (v === "" || v.search("待选") !== -1)) {
        return wx.showToast({
          title: "请完整填写信息",
          icon: "error"
        })
      }
    }
    // 都不为空后
    data.isDefault = data.isDefault === true ? 1 : 0
    wx.showLoading({
      title: '请稍后',
    })
    const { isEdit, _id } = this.data
    try {
      isEdit ? await httpUtil.changeAddressInfo({ _id, newInfo: data }) : await httpUtil.addAddress({ newInfo: data })
      wx.hideLoading()
      wx.showToast({
        title: `${isEdit ? "保存" : "添加"}成功`,
        icon: "success",
        success() {
          wx.navigateBack()
        }
      })
    } catch (error) {
      wx.hideLoading()
      wx.showToast({
        title: `${isEdit ? "保存" : "添加"}失败`,
        icon: "error"
      })
    }


  },

  bindRegionChange(e) {
    this.setData({
      city: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { isEdit, _id = "" } = options
    if (isEdit === "true") {
      httpUtil.getAddressInfo({ _id })
        .then(res => {
          const editAddress = res.data.addressInfo[0]
          this.setData({
            _id,
            editAddress,
            isEdit: true,
            city: editAddress.city
          })
        })
    } else {
      this.setData({
        isEdit: false
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