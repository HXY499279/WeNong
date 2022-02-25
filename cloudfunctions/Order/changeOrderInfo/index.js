const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { OPENID: userId, _id, newInfo = {} } = event

  try {
    const { isDefault } = newInfo
    if (isDefault) {
      await db.collection("addresses").where({
        userId
      }).update({
        data: {
          isDefault: 0
        }
      })
    }
    const res = await db.collection("addresses").where({
      userId,
      _id
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