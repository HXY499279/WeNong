const getUserInfo = require('./getUserInfo/index');
const changeUserInfo = require('./changeUserInfo/index');


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
  }
};