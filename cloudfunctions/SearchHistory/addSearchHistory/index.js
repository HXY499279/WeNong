const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { OPENID: userId, newInfo } = event
  const time = new Date().getTime() / 60000

  try {
    const { keyword = "" } = newInfo
    const res = await db.collection("searchHistories").where({ userId }).get()
    const searchHistory = res.data[0]
    // 如果搜索记录里面有该用户的搜索
    if (searchHistory) {
      const { searchMap = {} } = searchHistory
      searchMap[keyword] = time
      await db.collection("searchHistories").where({ userId }).update({
        data: {
          searchMap
        }
      })
    } else {
      const searchMap = {}
      searchMap[keyword] = time
      db.collection('searchHistories').add({
        data: {
          userId,
          searchMap
        }
      })
    }
    return { status: 1, message: "添加搜索历史成功" }
  } catch (error) {
    return { status: 0, message: "添加搜索历史失败" }
  }
}