const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { OPENID } = event

  const res = await db.collection("users").where({
    openid: OPENID
  }).get()
  const users = res.data

  if (users.length) {
    if (users[0].merchantId) {
      users[0].identity = "用户/商家"
      return { status: 1, data: { userInfo: users[0] }, message: "获取用户信息成功" }
    } else {
      users[0].identity = "用户"
      return { status: 1, data: { userInfo: users[0] }, message: "获取用户信息成功" }
    }
  } else {
    return { status: 0, message: "获取用户信息失败" }
  }
}