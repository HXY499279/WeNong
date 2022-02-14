const QQMapWX = require('../libs/qqmap-wx-jssdk.min');
const qqmapsdk = new QQMapWX({
  key: '2UWBZ-5C6LQ-BPS5O-GMR3A-UTWES-XUFKV'
});

const getCity = (memory = { city: '' }) => {
  const that = this
  // 获取地理位置
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        qqmapsdk.reverseGeocoder({
          location: {
            latitude,
            longitude
          },
          // 签名校验
          sig: "gP59Iu3egEET9MSOa3vrVaPZyPoC4cvr",
          success(res) {
            let city = res.result.address_component.province
            let arr = Array.from(city)
            arr.pop()
            city = arr.join('')
            // 更改缓存city
            memory.city = city
            resolve(city)
          }
        })
      },
      fail(e) {
        reject("获取权限失败")
      }
    })
  })
}

const getCityList = () => {
  return new Promise((resolve, reject) => {
    qqmapsdk.getCityList({
      sig: "gP59Iu3egEET9MSOa3vrVaPZyPoC4cvr",
      success: function (res) {//成功后的回调
        resolve(res.result[0])
      },
      fail: function (error) {
        reject(error)
      }
    });
  })
}

export { getCity, getCityList }