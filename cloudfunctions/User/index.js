const getUserInfo = require('./getUserInfo/index');
const changeUserInfo = require('./changeUserInfo/index');
const getUserLikeShop = require('./getUserLikeShop/index');
const getUserLikeCommodity = require('./getUserLikeCommodity/index');


// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = event

  if (!OPENID) {
    return { status: 0, message: "缺少OPENID" }
  }
  switch (event.type) {
    case 'getUserInfo':
      return await getUserInfo.main(event, context);
    case 'changeUserInfo':
      return await changeUserInfo.main(event, context);
    case 'getUserLikeShop':
      return await getUserLikeShop.main(event, context);
    case 'getUserLikeCommodity':
      return await getUserLikeCommodity.main(event, context);
  }
};