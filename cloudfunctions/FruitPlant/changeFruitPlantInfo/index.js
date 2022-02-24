const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { OPENID: merchantId, _id, newInfo = {} } = event
  if (!OPENID) {
    return { status: 0, message: "缺少OPENID" }
  }
  try {
    await db.collection("fruitPlants").where({
      merchantId
    }).update({
      data: {
        ...newInfo
      }
    })
    return { status: 1, data: { newInfo }, message: "更改成功" }
  } catch (error) {
    return { status: 0, message: "更改失败" }
  }
}