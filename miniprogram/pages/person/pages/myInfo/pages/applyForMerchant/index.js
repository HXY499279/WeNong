import httpUtil from '../../../../../../utils/httpUtil';
import uploadImageToCloud from '../../../../../../utils/uploadImageToCloud'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    region: ['待选择', '待选择', '待选择'],
    customItem: '待选择',
    timers: {
      nameInputTimer: null,
      phoneInputTimer: null,
      IDNumberInputTimer: null,
      creditCardNumberInputTimer: null,
      shopNameInputTimer: null,
    },
    sendData: {
      // 店主姓名
      name: "",
      // 店主手机号
      phone: 0,
      // 身份证号码
      IDNumber: 0,
      // 银行卡号码
      creditCardNumber: 0,
      // 店铺名称
      shopName: "",
      // 店铺所在城市
      city: "",
      // 店铺详细地址
      address: "",
      // 店铺认证报告
      certificationReport: ""
    },

    pageInputData: [
      {
        name: "店主姓名",
        placeholder: "请输入您的真实姓名",
        dataName: "name",
        type: "text",
        handleInput: "inputName"
      },
      {
        name: "店主手机号",
        placeholder: "请输入您的手机号",
        dataName: "phone",
        type: "number",
        handleInput: "inputPhone"
      },
      {
        name: "身份证号码",
        placeholder: "请输入您的身份证号码",
        dataName: "IDNumber",
        type: "idcard",
        handleInput: "inputIDNumber"
      },
      {
        name: "银行卡号码",
        placeholder: "请输入您的银行卡号",
        dataName: "creditCardNumber",
        type: "number",
        handleInput: "inputCreditCardNumber"
      },
      {
        name: "店铺名称",
        placeholder: "请输入您的店铺名称",
        dataName: "shopName",
        type: "text",
        handleInput: "inputShopName"
      }
    ]
  },

  afterRead(e) {
    const { file } = e.detail;
    // 上传完成需要更新 fileList
    const { fileList = [] } = this.data;
    fileList.push({ ...file });
    this.setData({ fileList });
  },

  deleteImage(e) {
    const index = e.detail.index;
    const { fileList = [] } = this.data;
    fileList.splice(index, 1);
    this.setData({ fileList });
  },

  // 提交表单
  bindFormSubmit(e) {
    const that = this
    const data = e.detail.value
    // 处理city
    const cities = data.city
    let arr = Array.from(data.city[0])
    arr.pop()
    data.city = arr.join('')
    // 检查是否有空
    for (let [i, v] of Object.entries(data)) {
      if (v === "" || v.search("待选") === 0) {
        return wx.showToast({
          title: "请完整填写信息",
          icon: "error"
        })
      }
    }
    wx.showModal({
      title: '提示',
      content: '请确认您填写的信息正确，以避免提交错误信息导致审核失败',
      success() {
        // 处理address
        let headAddress
        if (cities[0] === cities[1]) {
          headAddress = cities[1] + cities[2]
        } else {
          headAddress = cities.join("")
        }
        const oldAddress = data.address
        const reg = new RegExp(`${cities[0]}|${cities[1]}|${cities[2]}`, "g")
        const pureAddress = oldAddress.replace(reg, "")
        data.address = headAddress + pureAddress
        // 处理图片
        const { fileList } = that.data
        if (!fileList.length) {
          wx.showToast({ title: '请上传店铺认证报告', icon: 'none' });
        } else {
          wx.showLoading({
            title: '提交中...',
          })
          uploadImageToCloud(fileList, "店铺认证报告")
            .then(res => {
              data.certificationReport = res.map(item => item.fileID)
              httpUtil.applyForMerchant({ merchantInfo: data })
                .then(res => {
                  wx.hideLoading()
                  wx.showModal({
                    title: '申请成功',
                    content: '您的申请提交成功，预计2-3个工作日内审核完毕，请在我的店铺中查看审核结果',
                    success() {
                      // 暂时往回跳，等我的店铺页面完善后更改至我的店铺
                      wx.navigateBack()
                    },
                    fail() {
                      // 暂时往回跳，等我的店铺页面完善后更改至我的店铺
                      wx.navigateBack()
                    }
                  })
                }, err => {
                  wx.hideLoading()
                  wx.showToast({
                    title: err.message,
                    icon: "error"
                  })
                })
            }, () => {
              wx.hideLoading()
              wx.showToast({ title: '店铺认证报告上传失败', icon: 'none' });
            })
        }
      }
    })
  },

  bindRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
  },
  // // 防抖函数
  // debounce(timerName, fn, wait) {
  //   const timers = this.data.timers
  //   if (timers[timerName]) {
  //     clearTimeout(timers[timerName])
  //   }
  //   timers[timerName] = setTimeout(() => {
  //     fn()
  //   }, wait)
  //   this.setData({ timers })
  // },

  // inputName(e) {
  //   this.debounce("nameInputTimer", () => {
  //     const name = e.detail.value
  //     this.setData({
  //       name
  //     })
  //   }, 1000)
  // },
  // inputPhone(e) {
  //   this.debounce("phoneInputTimer", () => {
  //     const phone = e.detail.value
  //     this.setData({
  //       phone
  //     })
  //   }, 1000)
  // },
  // inputIDNumber(e) {
  //   this.debounce("IDNumberInputTimer", () => {
  //     const IDNumber = e.detail.value
  //     this.setData({
  //       IDNumber
  //     })
  //   }, 1000)
  // },
  // inputCreditCardNumber(e) {
  //   this.debounce("creditCardNumberInputTimer", () => {
  //     const creditCardNumber = e.detail.value
  //     this.setData({
  //       creditCardNumber
  //     })
  //   }, 1000)
  // },
  // inputShopName(e) {
  //   this.debounce("shopNameInputTimer", () => {
  //     const shopName = e.detail.value
  //     this.setData({
  //       shopName
  //     })
  //   }, 1000)
  // },

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