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
    const { likeCommodity } = users[0]
    let commodities = []

    for (let i = 0; i < likeCommodity.length; i++) {
      const commodityId = likeCommodity[i]
      try {
        const { result = {} } = await cloud.callFunction({
          name: "Commodity",
          data: {
            type: "getCommodityInfo",
            query: {
              _id: commodityId
            }
          }
        })
        console.log(result);
        commodities.push(...result.data.commodityInfo)
      } catch (error) {
        console.log("查询收藏商品失败", error);
        return { status: 0, message: "查询收藏商品失败" }
      }
    }
    return { status: 1, data: { likeCommodity: commodities }, message: "获取收藏商品成功" }
  } else {
    return { status: 0, message: "获取收藏商品失败" }
  }
}