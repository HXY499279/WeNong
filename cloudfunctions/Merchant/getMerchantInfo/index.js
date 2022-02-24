const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  // 随机生成审核结果
  const mockData = ["您提交的店铺认证报告，经过核实确认有误，请核对后再次提交", "您填写的姓名与您的身份证真实姓名不匹配，请确认后重新提交", "经过银行检测，您提交的银行卡已过期，请确认后重新提交"]
  const getMockData = () => mockData[Math.floor(Math.random() * 3)]
  const getStatusResult = () => {
    const num = Math.random() * 10
    if (num > 8) {
      return 0
    } else {
      return 1
    }
  }

  // 设定生成审核结果的

  const { OPENID } = event

  try {
    const res = await db.collection("merchants").where({
      openid: OPENID
    }).get()

    const merchants = res.data

    if (merchants.length) {
      const merchant = merchants[0]
      // 对商家审核中的自动处理
      if (merchant.status === 2) {
        // 设置申请后距离审核出结果的时间，单位分钟
        const t = 1
        // 距离1970 年 1 月 1 日的分钟数
        const min = new Date().getTime() / 60000
        if (min - merchant.applyTime >= t) {
          // 生成注册时间
          const date = new Date()
          const year = date.getUTCFullYear()
          const month = date.getUTCMonth() + 1
          const day = date.getUTCDate()
          const hour = date.getHours()
          const min = date.getUTCMinutes()
          const second = date.getUTCSeconds()
          const registerTime = `${year}年${month}月${day}日 ${hour}:${min}:${second}`

          const mockStatus = getStatusResult()
          if (mockStatus === 0) {
            const mockResult = getMockData()
            // 修改商家的信息
            try {
              await db.collection("merchants").where({
                openid: OPENID
              }).update({
                data: {
                  status: mockStatus,
                  checkedResult: mockResult,
                  registerTime
                }
              })
              merchant.status = mockStatus
              merchant.checkedResult = mockResult
              merchant.registerTime = registerTime
            } catch (error) {
              console.log(error);
            }
          } else {
            // 修改商家的信息
            try {
              await db.collection("merchants").where({
                openid: OPENID
              }).update({
                data: {
                  status: mockStatus,
                  registerTime
                }
              })
              merchant.status = mockStatus
              merchant.registerTime = registerTime
            } catch (error) {
              console.log(error);
            }
          }
        }
      }

      return { status: 1, data: { merchantInfo: merchant }, message: "获取商家信息成功" }
    } else {
      return { status: 0, message: "获取商家信息失败" }
    }
  } catch (error) {
    return { status: 0, message: "获取商家信息失败" }
  }
}