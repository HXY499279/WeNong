const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { OPENID: merchantId, newInfo } = event
  if (!OPENID) {
    return { status: 0, message: "缺少OPENID" }
  }
  try {
    const fruitPlant = await db.collection("fruitPlants").add({
      data: {
        merchantId,
        ...newInfo,
      }
    })

    return { status: 1, data: { fruitPlant }, message: "添加果苗成功" }
  } catch (error) {
    return { status: 0, message: "添加果苗失败" }
  }
}