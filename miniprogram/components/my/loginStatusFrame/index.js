// components/my/loginStatusFrame/index.js
Component({
  properties: {
    isLogin: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {
        this.setData({
          isLogin: newVal
        })
      }
    },
    userInfo: {
      type: Object,
      value: null,
      observer: function (newVal, oldVal) {
        // 当昵称和头像改变时才重新渲染
        if (newVal.niclName !== oldVal?.nickName || newVal.avatarUrl !== oldVal?.avatarUrl) {
          this.setData({
            userInfo: newVal
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isLogin: false,
    userInfo: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick(e) {
      wx.navigateTo({
        url: '/pages/person/pages/loginSwitch/index',
      })
    },
    enterMyInfo(e){
      wx.navigateTo({
        url: '/pages/person/pages/myInfo/index',
      })
    }
  }
})
