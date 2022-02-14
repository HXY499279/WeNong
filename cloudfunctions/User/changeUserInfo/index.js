const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { OPENID, newInfo } = event

  try {
    const res = await db.collection("users").where({
      openid: OPENID
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