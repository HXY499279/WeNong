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
    const { likeShop } = users[0]
    let shops = []

    for (let i = 0; i < likeShop.length; i++) {
      const OPENID = likeShop[i]
      try {
        const { result = {} } = await cloud.callFunction({
          name: "Merchant",
          data: {
            type: "getMerchantInfo",
            OPENID
          }
        })
        shops.push(result.data.merchantInfo)
      } catch (error) {
        console.log("查询关注商家失败", error);
        return { status: 0, message: "获取关注店铺失败" }
      }
    }

    return { status: 1, data: { likeShop: shops }, message: "获取关注店铺成功" }
  } else {
    return { status: 0, message: "获取关注店铺失败" }
  }
}