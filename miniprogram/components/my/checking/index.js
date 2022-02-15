import httpUtil from "../../../utils/httpUtil"

// components/my/checking/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    merchantInfo: {
      type: Object,
      value: {},
      observer(newVal) {
        if(newVal.status === 1 || newVal.status === 0){
          this.setData({
            active: 2
          },() => {
            console.log(this.data.active);
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 1,
    steps: [
      {
        text: '申请成功',
      },
      {
        text: '审核中',
      },
      {
        text: '审核完毕',
      }
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toMyShop() {
      httpUtil.changeMerchantInfo({ newInfo: { status: 3 } })
        .then(res => {
          wx.redirectTo({
            url: '/pages/person/pages/myShop/index'
          })
        })
    },
    resumbit() {
      httpUtil.deleteMerchant()
        .then(res => {
          wx.redirectTo({
            url: '/pages/person/pages/myInfo/pages/applyForMerchant/index'
          })
        })
    }
  }
})
