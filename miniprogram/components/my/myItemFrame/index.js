import checkLogin from "../../../utils/checkLogin"

// components/my/myItemFrame/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo: {
      type: Object,
      value: {},
      observer(newVal) {
        this.setData({
          userInfo: newVal
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo: null,
    myItems: [
      {
        icon: "shop-o",
        title: "我的店铺",
        onTap: "toMyShop"
      },
      {
        icon: "flower-o",
        title: "我的领养",
        onTap: "toMyAdopt"
      },
      {
        icon: "star-o",
        title: "我的收藏",
        onTap: "toMyLikeCommodity"
      },
      {
        icon: "location-o",
        title: "我的收货地址",
        onTap: "toMyAddress"
      },
      {
        icon: "shop-collect-o",
        title: "我关注的店铺",
        onTap: "toMyLikeShop"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 我的店铺
    toMyShop() {
      const { userInfo } = this.data
      checkLogin()
        .then(() => {
          if (!userInfo.merchantId) {
            wx.navigateTo({
              url: '/pages/person/pages/myInfo/pages/applyForMerchant/index',
            })
          } else {
            wx.navigateTo({
              url: '/pages/person/pages/myShop/index',
            })
          }
        })
    },
    // 我的领养
    toMyAdopt() {
      checkLogin()
        .then(() => {
          wx.navigateTo({
            url: '/pages/person/pages/myAdopt/index',
          })
        })
    },
    // 我的收藏
    toMyLikeCommodity() {
      checkLogin()
        .then(() => {
          wx.navigateTo({
            url: '/pages/person/pages/myLikeCommodity/index',
          })
        })
    },
    // 我的收货地址
    toMyAddress() {
      checkLogin()
        .then(() => {
          wx.navigateTo({
            url: '/pages/person/pages/myAddress/index',
          })
        })
    },
    // 我关注的店铺
    toMyLikeShop() {
      checkLogin()
        .then(() => {
          wx.navigateTo({
            url: '/pages/person/pages/myLikeShop/index',
          })
        })
    }
  }
})
