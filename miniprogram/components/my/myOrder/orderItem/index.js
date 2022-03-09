import { WILLPAY_ORDER_MAX_TIME } from "../../../../utils/constant"
import httpUtil from "../../../../utils/httpUtil"

// components/my/myOrder/orderItem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {},
    },
    hasCheckLogistics: {
      type: Boolean,
      value: false,
    },
    btn1Text: {
      type: String,
      value: null,
    },
    btn2Text: {
      type: String,
      value: null,
    },
    hasCountDownTime: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    countDownTime: "",
    // 是否有了组件实例
    hasInstance: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 执行倒计时 秒为单位
    countDown(item) {
      let endTime = wx.getStorageSync(`countDownTime-${item._id}`)
      const nowTime = Math.floor(new Date().getTime() / 1000)
      const maxtime = endTime - nowTime
      if (maxtime <= 0) {
        this.setData({
          countDownTime: "已过期"
        })
        // 过期后删除该订单
        httpUtil.deleteOrder({ _id: item._id })
        // 关闭倒计时器
        clearInterval(wx.getStorageSync(`countDownTimer-${item._id}`))
        // 清除定时器和时间的缓存
        wx.setStorageSync(`countDownTimer-${item._id}`, null)
        return
      } else {
        const hour = Math.floor(maxtime / 3600)
        const min = Math.floor((maxtime - hour * 3600) / 60);
        const second = maxtime - hour * 3600 - min * 60
        const countDownTime = `${hour}:${min}:${second}`
        this.setData({
          countDownTime
        })
      }
    },

    bindCheckLogistics() {
      this.triggerEvent("checkLogistics", {})
    },
    bindBtn1() {
      this.triggerEvent("btn1", {})
    },
    bindBtn2() {
      this.triggerEvent("btn2", {})
    },
  },

  attached() {
    if (this.data.hasCountDownTime) {
      const item = this.data.item
      if (!wx.getStorageSync(`countDownTime-${item._id}`)) {
        const endTime = Math.floor(new Date().getTime() / 1000) + WILLPAY_ORDER_MAX_TIME
        wx.setStorageSync(`countDownTime-${item._id}`, endTime)
      }
      // 定时器存在就清除
      wx.getStorageSync(`countDownTimer-${item._id}`) && clearInterval(wx.getStorageSync(`countDownTimer-${item._id}`))
      // 清除后也重新设置
      wx.setStorageSync(`countDownTimer-${item._id}`, setInterval(this.countDown.bind(this, item), 1000))
    }
  },

  moved() {
    if (this.data.hasCountDownTime) {
      const item = this.data.item
      const maxTime = Math.floor(new Date().getTime() / 1000) + WILLPAY_ORDER_MAX_TIME
      wx.getStorageSync(`countDownTime-${item._id}`) || wx.setStorageSync(`countDownTime-${item._id}`, maxTime)
      // 定时器存在就清除
      wx.getStorageSync(`countDownTimer-${item._id}`) && clearInterval(wx.getStorageSync(`countDownTimer-${item._id}`))
      // 清除后也重新设置
      wx.setStorageSync(`countDownTimer-${item._id}`, setInterval(this.countDown.bind(this, item), 1000))
    }
  },
})
