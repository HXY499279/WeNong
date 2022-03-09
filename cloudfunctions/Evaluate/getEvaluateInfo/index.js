const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { OPENID: userId, query: conditions = {} } = event

  try {
    const { commodityId, skip = null, limit = null } = conditions
    const query = { commodityId }
    const res = (skip !== null && limit !== null)
      ?
      await db.collection("evaluates").where(query).skip(skip).limit(limit).get()
      :
      await db.collection("evaluates").where(query).get()
    const evaluates = res.data
    if (!evaluates.length) return { status: 1, data: { evaluateInfo: evaluates }, message: "获取评论信息成功" }
    for (let evaluate of evaluates) {
      // 计算得分率
      const scoreSum = evaluate.CommodityScore + evaluate.merchantServiceScore + evaluate.logisticsServiceScore
      evaluate.totalScore = (scoreSum / 15) * 5
      const { userId } = evaluate
      // 获取评价所属用户的信息
      const { result = {} } = await cloud.callFunction({
        name: "User",
        data: {
          type: "getUserInfo",
          OPENID: userId
        }
      })
      const { userInfo = {} } = result.data
      evaluate.userInfo = userInfo
    }
    evaluates.sort((a, b) => b.addTime - a.addTime)
    return { status: 1, data: { evaluateInfo: evaluates }, message: "获取评论信息成功" }
  } catch (error) {
    console.log(error);
    return { status: 0, message: "获取评论信息失败" }
  }

}