const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  try {
    const res = await db.collection("infos").get()
    const infos = res.data
    return { status: 1, data: { infos }, message: "获取资讯信息成功" }
  } catch (error) {
    return { status: 0, message: "获取资讯信息失败" }
  }
}