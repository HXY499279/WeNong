const getLocationAuth = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocationBackground',
            success(res) {
              console.log("获取权限", res);
              resolve(res)
            },
            fail(res) {
              console.log("获取权限", res);
              reject(res)
            }
          })
        }
        resolve()
      },
      fail(){
        reject()
      }
    })
  })
}

export default getLocationAuth