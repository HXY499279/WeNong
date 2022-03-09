const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { OPENID: userId, newInfo } = event

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
    const address = await db.collection("addresses").add({
      data: {
        userId,
        ...newInfo,
      }
    })

    return { status: 1, data: { address }, message: "添加地址成功" }
  } catch (error) {
    return { status: 0, message: "添加地址失败" }
  }
}