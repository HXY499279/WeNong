const httpReq = async (feature, url, data = {}, isAuth) => {
  if (isAuth) {
    const OPENID = wx.getStorageSync('hasLoginOPENID')
    data.OPENID = OPENID
  }
  const req = new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: feature,
      data: {
        type: url,
        ...data
      }
    }).then(({ result }) => {
      if (result.status === 1) {
        resolve(result)
      } else {
        reject(result.message)
      }
    }, (err) => {
      reject(err)
    }).catch(err => {
      console.error("请求异常")
    });
  })

  if (isAuth) {
    // 如果是权限接口，每次请求验证登录态
    if (wx.getStorageSync('hasLoginOPENID')) {
      return await new Promise((resolve, reject) => {
        wx.checkSession({
          success: (res) => {
            // 检验成功放行
            console.log("登录态未过期");
            resolve(req)
          },
          fail: (err) => {
            console.log("登录态已过期");
            wx.showToast({
              title: '登录过期',
              icon: "error",
              duration: 2000
            })
            wx.setStorageSync('hasLoginOPENID', null)
            reject(null)
          }
        })
      })
    } else {
      wx.navigateTo({
        url: '/pages/person/pages/loginSwitch/index',
      })
      console.log("未登录");
      return Promise.reject("未登录")
    }
  } else {
    return req
  }
}

export default httpReq