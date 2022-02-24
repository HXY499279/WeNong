const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { OPENID } = event

  if (!OPENID) {
    return { status: 0, message: "缺少OPENID" }
  }

  try {
    // 删除商家
    await db.collection('merchants').where({
      openid: OPENID
    }).remove()

    // 并把该用户的商家id置空
    await cloud.callFunction({
      name: "User",
      data: {
        type: "changeUserInfo",
        OPENID,
        newInfo: {
          merchantId: ""
        }
      }
    })

    return { status: 1, message: "删除成功" }
  } catch (error) {
    return { status: 0, message: "删除失败" }
  }
}