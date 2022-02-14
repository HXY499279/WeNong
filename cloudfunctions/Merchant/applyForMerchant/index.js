const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { OPENID, merchantInfo } = event

  // 详细介绍
  const detailIntro = ""
  // 店铺评分
  const grade = 0
  // 店铺销售量
  const saleNumber = 0
  // 店铺成交额
  const makedMoney = 0
  // 店铺成交订单数
  const orderNumber = 0
  // 店铺注册时间
  const time = 0
  // 店铺粉丝数
  const fans = 0
  // 店铺照片
  const images = []
  // 店铺审核状态
  const status = 2

  try {
    const res = await db.collection("merchants").add({
      data: {
        openid: OPENID,
        ...merchantInfo,
        detailIntro,
        grade,
        saleNumber,
        makedMoney,
        orderNumber,
        time,
        fans,
        images,
        status,
      }
    })
    const { result } = await cloud.callFunction({
      name: "User",
      data: {
        type: "changeUserInfo",
        OPENID,
        newInfo: {
          merchantId: OPENID
        }
      }
    })
    console.log(res);
    return { status: 1, data: { res }, message: "申请提交成功" }
  } catch (error) {
    return { status: 0, message: "申请提交失败" }
  }
}