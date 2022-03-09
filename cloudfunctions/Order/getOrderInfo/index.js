const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { OPENID: userId, query: conditions = { status: "allOrders", skip: 0 } } = event

  try {
    const query = { userId, ...conditions }
    let orders = []
    if (query.status === "allOrders") {
      let res = null
      query.limit ? res = await db.collection("orders").where({ userId }).skip(query.skip).limit(query.limit).get() : res = await db.collection("orders").where({ userId }).skip(query.skip).get()
      orders = res.data
    } else if (query.status === "finished") {
      const res1 = await db.collection("orders").where({ userId, status: "willEvaluate" }).get()
      const res2 = await db.collection("orders").where({ userId, status: "evaluated" }).get()
      orders = [...res1.data, ...res2.data]
    } else if (query.status === "return") {
      const res1 = await db.collection("orders").where({ userId, status: "returnMoneyRequest" }).get()
      const res2 = await db.collection("orders").where({ userId, status: "returnCommodityRequest" }).get()
      const res3 = await db.collection("orders").where({ userId, status: "willRefund" }).get()
      const res4 = await db.collection("orders").where({ userId, status: "refunded" }).get()
      orders = [...res1.data, ...res2.data, ...res3.data, ...res4.data]
    } else {
      const res = await db.collection("orders").where({ userId, status: query.status }).get()
      orders = res.data
    }
    (query.status === "finished" || query.status === "return") ? 0 : orders.sort((a, b) => b.compareTime - a.compareTime)
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