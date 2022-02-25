const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { OPENID: userId, query: conditions = { status: "allOrders" } } = event

  try {
    const query = { userId, ...conditions }
    let orders = []
    if (query.status === "allOrders") {
      const res = await db.collection("orders").where({ userId }).get()
      orders = res.data
    } else {
      const res = await db.collection("orders").where(query).get()
      orders = res.data
    }
    orders.sort((a, b) => b.compareTime - a.compareTime)
    for (let order of orders) {
      // 获取地址
      const addressesData = await cloud.callFunction({
        name: "Address",
        data: {
          type: "getAddressInfo",
          OPENID: userId,
          query: { _id: order.addressId }
        }
      })
      const address = addressesData.result.data.addressInfo[0]
      // 获取商品
      const commiditiesData = await cloud.callFunction({
        name: "Commodity",
        data: {
          type: "getCommodityInfo",
          OPENID: userId,
          query: { _id: order.commodityId }
        }
      })
      const commodity = commiditiesData.result.data.commodityInfo[0]
      order.address = address
      order.commodity = commodity
    }

    return { status: 1, data: { orders }, message: "获取订单信息成功" }
  } catch (error) {
    return { status: 0, message: "获取订单信息失败" }
  }

}