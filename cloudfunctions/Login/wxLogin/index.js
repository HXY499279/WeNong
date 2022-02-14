const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  // 获取用户唯一标识
  const { OPENID } = wxContext
  //获取用户的昵称和头像
  const { userInfo } = event

  if (!OPENID) {
    return { status: 0, data: { OPENID }, message: "登录失败" }
  }

  const res = await db.collection("users").where({
    openid: OPENID
  }).get()
  const users = res.data

  if (users.length) {
    // 用户存在，更新用户昵称和头像
    const res = await db.collection("users").where({
      openid: OPENID
    }).update({
      data: {
        ...userInfo
      }
    })
    return { status: 1, data: { OPENID }, message: "登录成功" }
  }

  // 获取注册时间
  const registerTime = new Date().toLocaleDateString()
  // 初始化钱包
  const money = 0
  // 初始化关注店铺
  const likeStore = []
  // 初始化收藏
  const likeCommodity = []
  // 初始化商家身份
  const merchantId = null
  // 初始化手机号
  const phone = null
  // 初始化所在城市
  const city = null

  db.collection("users").add({
    data: {
      openid: OPENID,
      ...userInfo,
      phone,
      registerTime,
      merchantId,
      city,
      likeCommodity,
      money,
      likeStore,
    }
  })
    .then(res => {
      console.log(res);
    })
  return { status: 1, data: { OPENID }, message: "登录成功" }
}