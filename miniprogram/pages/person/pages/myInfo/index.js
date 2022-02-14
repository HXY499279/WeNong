import httpUtil from "../../../../utils/httpUtil"
import getLocationAuth from "../../../../utils/getLoacationAuth"
import { getCity } from "../../../../utils/getCity"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    getCityTimer: null,
    getCityWaitTime: 35,
    merchantInfo: null,
    userInfo: null,
    canNotChangedUserInfo: [],
    canChangedUserInfo: [],
    loading: true
  },

  toMyShop() {
    wx.navigateTo({
      url: '/pages/person/pages/myShop/index',
    })
  },

  toApplyForMerchant() {
    wx.navigateTo({
      url: '/pages/person/pages/myInfo/pages/applyForMerchant/index',
    })
  },

  myGetCityAndDo(userInfo) {
    const that = this
    wx.showLoading({
      title: '获取中...',
    })
    getCity(userInfo)
      .then((city) => {
        httpUtil.changeUserInfo({ newInfo: { city } })
          .then(res => {
            // 重新渲染页面city，更新页面的所在城市
            const canChangedUserInfo = that.data.canChangedUserInfo
            canChangedUserInfo[0].value = city
            that.setData({
              canChangedUserInfo
            }, () => {
              wx.hideLoading()
              wx.showToast({
                title: '获取成功',
                icon: "success"
              })
            })
          })
      }, err => {
        wx.hideLoading()
        wx.showToast({
          title: err,
          icon: "error"
        })
      })
  },

  logout() {
    wx.showModal({
      title: '提示',
      content: '您确定退出we农登录吗？',
      success() {
        wx.setStorageSync('hasLoginOPENID', null)
        wx.navigateBack()
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
    const that = this
    if (this.data.canNotChangedUserInfo && this.data.canChangedUserInfo) {
      httpUtil.getUserInfo()
        .then(res => {
          const userInfo = res.data.userInfo
          const canNotChangedUserInfo = [
            {
              itemName: "头像",
              value: userInfo.avatarUrl,
              isPic: true,
              last: ''
            },
            {
              itemName: "昵称",
              value: userInfo.nickName,
              isPic: false,
              last: ''
            },
            {
              itemName: "身份",
              value: userInfo.identity,
              isPic: false,
              last: ''
            },
            {
              itemName: "注册时间",
              value: userInfo.registerTime,
              isPic: false,
              last: 'last'
            },
          ]
          const canChangedUserInfo = [
            {
              itemName: "所在城市",
              value: userInfo.city,
              isPic: false,
              last: '',
              clickFunction: {
                fun: () => {
                  if (!userInfo.city) {
                    // 如果用户没有city就直接获取
                    getLocationAuth()
                      .then(res => {
                        that.myGetCityAndDo(userInfo)
                      }, (err) => {
                        wx.showToast({
                          title: "获取位置权限失败",
                          icon: "error"
                        })
                      })
                  } else {
                    // 如果用户有city，询问是否获取
                    console.log(this.data.getCityTimer);
                    if (that.data.getCityTimer) {
                      // 如果获取city定时器存在，提示请勿频繁操作
                      wx.showToast({
                        title: `操作频繁，等待${that.data.getCityWaitTime}s`,
                        icon: "error"
                      })
                    } else {
                      wx.showModal({
                        title: '地理位置',
                        content: '是否获取当前所在城市？',
                        success(res) {
                          if (res.confirm) {
                            that.myGetCityAndDo(userInfo)
                            that.setData({
                              getCityTimer: setTimeout(() => {
                                clearTimeout(that.data.getCityTimer)
                                that.setData({
                                  getCityTimer: null
                                })
                              }, that.data.getCityWaitTime * 1000)
                            })
                          }
                        }
                      })
                    }
                  }
                }
              }
            },
            {
              itemName: "手机号",
              value: userInfo.phone,
              isPic: false,
              last: '',
              // 跳转更换手机号码页面
              clickFunction: {
                fun: () => {
                  wx.navigateTo({
                    url: '/pages/person/pages/myInfo/pages/changePhone/index',
                  })
                }
              }
            },
            {
              itemName: "收获地址",
              value: "",
              isPic: false,
              last: 'last',
              clickFunction: {
                fun: () => {
                  // 跳转收获地址页面
                  wx.navigateTo({
                    url: '/pages/person/pages/myInfo/index',
                  })
                }
              }
            }
          ]
          this.setData({
            userInfo,
            canNotChangedUserInfo,
            canChangedUserInfo,
          })
        }, (err) => {
          wx.showToast({
            title: err.message,
            icon: "error"
          })
        })
    }
    httpUtil.getMerchantInfo()
      .then(res => {
        const merchantInfo = res.data.merchantInfo
        console.log(merchantInfo);
        this.setData({
          merchantInfo,
          loading: false
        })
      }, err => {
        this.setData({
          merchantInfo: {},
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