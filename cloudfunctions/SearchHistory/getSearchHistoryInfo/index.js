const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { OPENID: userId, query: conditions = {} } = event

  try {
    const query = { userId, ...conditions }
    const res = await db.collection("searchHistories").where(query).get()
    const searchHistoryInfo = res.data[0]
    return { status: 1, data: { searchHistoryInfo }, message: "获取搜索历史信息成功" }
  } catch (error) {
    return { status: 0, message: "获取搜索历史信息失败" }
  }

}