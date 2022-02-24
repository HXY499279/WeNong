const checkLogin = () => {
  return new Promise((res, rej) => {
    const OPENID = wx.getStorageSync('hasLoginOPENID')
    if (!OPENID) {
      rej()
      wx.navigateTo({
        url: '/pages/person/pages/loginSwitch/index',
      })
    } else {
      res()
    }
  })
}

export default checkLogin