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
        onTap: ""
      },
      {
        icon: "star-o",
        title: "我的收藏",
        onTap: ""
      },
      {
        icon: "location-o",
        title: "我的收货地址",
        onTap: ""
      },
      {
        icon: "shop-collect-o",
        title: "我关注的店铺",
        onTap: ""
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    judgeLogin() {
      const OPENID = wx.getStorageSync('hasLoginOPENID')
      if (!OPENID) {
        wx.navigateTo({
          url: '/pages/person/pages/loginSwitch/index',
        })
      }
    },
    judgeMerchant() {
      const { userInfo } = this.data
      if (!userInfo.merchantId) {
        wx.navigateTo({
          url: '/pages/person/pages/myInfo/pages/applyForMerchant/index',
        })
      }
    },
    // 我的店铺
    toMyShop() {
      this.judgeLogin()
      this.judgeMerchant()
      wx.navigateTo({
        url: '/pages/person/pages/myShop/index',
      })
    }
  }
})
