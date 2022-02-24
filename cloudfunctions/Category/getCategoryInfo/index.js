const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { query = {} } = event

  try {
    const res = await db.collection("categories").where(query).get()
    const categories = res.data
    return { status: 1, data: { categoryInfo: categories }, message: "获取分类信息成功" }
  } catch (error) {
    return { status: 0, message: "获取分类信息失败" }
  }
}