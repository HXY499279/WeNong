const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { OPENID: userId, commodityId } = event

  try {
    // 删除购物车商品
    await db.collection('carts').where({
      userId,
      commodityId
    }).remove()

    return { status: 1, message: "删除成功" }
  } catch (error) {
    return { status: 0, message: "删除失败" }
  }
}