const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {

  const { OPENID, commodities = [] } = event
  try {
    await db.collection('users').where({
      openid: OPENID
    }).update({
      data: {
        likeCommodity: _.unshift(...commodities)
      }
    })
    return { status: 1, message: "收藏商品成功" }
  } catch (err) {
    return { status: 0, message: "收藏商品失败" }
  }
}