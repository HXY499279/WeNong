const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { OPENID: userId, _id } = event

  try {
    // 删除订单
    await db.collection('orders').where({
      userId,
      _id
    }).remove()

    return { status: 1, message: "删除成功" }
  } catch (error) {
    return { status: 0, message: "删除失败" }
  }
}