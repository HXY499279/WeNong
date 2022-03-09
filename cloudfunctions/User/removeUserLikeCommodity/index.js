const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { OPENID, commodityId } = event
  try {
    const res = await db.collection('users').where({
      openid: OPENID
    }).get()
    const users = res.data
    if (users.length) {
      const user = users[0]
      let { likeCommodity } = user
      likeCommodity = likeCommodity.filter(item => item !== commodityId)
      await db.collection('users').where({
        openid: OPENID
      }).update({
        data: {
          likeCommodity
        }
      })
    }

    return { status: 1, message: "取消收藏商品成功" }
  } catch (err) {
    return { status: 0, message: "取消收藏商品失败" }
  }
}