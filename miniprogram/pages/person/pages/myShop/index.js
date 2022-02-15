import httpUtil from '../../../../utils/httpUtil'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    merchantInfo: null,
    canEnterShop: false,
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
    httpUtil.getMerchantInfo()
      .then(res => {
        console.log(res);
        const { merchantInfo } = res.data
        const { status } = merchantInfo
        if (status === 3) {
          this.setData({
            canEnterShop: true
          })
        } else {
          this.setData({
            canEnterShop: false
          })
        }
        this.setData({
          merchantInfo,
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