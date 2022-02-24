const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { OPENID: userId, query: conditions = {} } = event

  try {
    console.log(conditions);
    const query = { userId, ...conditions }
    const res = await db.collection("addresses").where(query).get()
    const addresses = res.data
    return { status: 1, data: { addressInfo: addresses }, message: "获取地址信息成功" }
  } catch (error) {
    return { status: 0, message: "获取地址信息失败" }
  }

}