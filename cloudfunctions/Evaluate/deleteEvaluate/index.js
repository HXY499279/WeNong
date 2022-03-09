const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { OPENID: userId, _id } = event

  try {
    // 删除地址
    await db.collection('addresses').where({
      userId,
      _id
    }).remove()

    return { status: 1, message: "删除成功" }
  } catch (error) {
    return { status: 0, message: "删除失败" }
  }
}