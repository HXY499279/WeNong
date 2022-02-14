const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { OPENID } = event

  const res = await db.collection("merchants").where({
    openid: OPENID
  }).get()
  const merchants = res.data

  if (merchants.length) {
    return { status: 1, data: { merchantInfo: merchants[0] }, message: "获取商家信息成功" }
  } else {
    return { status: 0, message: "获取商家信息失败" }
  }
}