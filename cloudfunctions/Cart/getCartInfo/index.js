const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { OPENID: userId } = event

  try {
    const query = { userId }
    const res = await db.collection("carts").where(query).get()
    const carts = res.data
    for (let cart of carts) {
      const { commodityId } = cart
      const { result = {} } = await cloud.callFunction({
        name: "Commodity",
        data: {
          type: "getCommodityInfo",
          query: {
            _id: commodityId
          }
        }
      })
      delete cart.commodityId
      cart.commodityInfo = result.data.commodityInfo[0]
    }
    // 将商品按照商家归类
    const newData = {}
    carts.forEach(cart => {
      const { commodityInfo, number, addTime } = cart
      const { merchantInfo, merchantId: merchant } = commodityInfo
      commodityInfo.number = number
      commodityInfo.addTime = addTime
      if (merchant in newData) {
        newData[merchant].commodities.push(commodityInfo)
      } else {
        newData[merchant] = { merchantInfo }
        newData[merchant]["commodities"] = [commodityInfo]
      }
    })
    // 将每个商家的商品排序，从新到旧
    for (let [i, item] of Object.entries(newData)) {
      item.commodities.sort((a, b) => b.addTime - a.addTime)
    }
    // 再将该商家最新的商品作为商家的时间，然后将商家由新到旧排序
    let returnData = []
    for (let [i, item] of Object.entries(newData)) {
      item.addTime = item.commodities[0].addTime
      returnData.push(item)
    }
    returnData.sort((a, b) => b.addTime - a.addTime)

    return { status: 1, data: { cartInfo: returnData }, message: "获取购物车信息成功" }
  } catch (error) {
    return { status: 0, message: "获取购物车信息失败" }
  }

}