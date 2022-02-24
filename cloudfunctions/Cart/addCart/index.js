const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { OPENID: userId, newInfo } = event

  try {
    const { commodityId, number } = newInfo

    // 先看新加的商品是否已存在购物车中
    const res = await db.collection("carts").where({ commodityId }).get()
    const resCart = res.data[0]
    if (resCart) {
      const addTime = new Date().getTime() / 60000
      await db.collection("carts").where({ commodityId }).update({
        data: {
          addTime,
          number: resCart.number + number
        }
      })
    } else {
      const addTime = new Date().getTime() / 60000
      const cart = await db.collection("carts").add({
        data: {
          userId,
          ...newInfo,
          addTime
        }
      })
    }
    return { status: 1, message: "添加购物车成功" }
  } catch (error) {
    return { status: 0, message: "添加购物车失败" }
  }
}