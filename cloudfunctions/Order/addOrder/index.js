const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { OPENID: userId, newOrders } = event

  try {
    const compareTime = new Date().getTime() / 60000
    for (let order of newOrders) {
      await db.collection("orders").add({
        data: {
          userId,
          ...order,
          compareTime
        }
      })
      await cloud.callFunction({
        name: "Cart",
        data: {
          type: "deleteCart",
          OPENID: userId,
          commodityId: order.commodityId
        }
      })
    }

    return { status: 1, message: "添加订单成功" }
  } catch (error) {
    return { status: 0, message: "添加订单失败" }
  }
}