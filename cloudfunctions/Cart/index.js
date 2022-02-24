const getCartInfo = require('./getCartInfo/index');
const changeCartInfo = require('./changeCartInfo/index');
const deleteCart = require('./deleteCart/index');
const addCart = require('./addCart/index');

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = event

  if (!OPENID) {
    return { status: 0, message: "缺少OPENID" }
  }
  switch (event.type) {
    case 'getCartInfo':
      return await getCartInfo.main(event, context);
    case 'changeCartInfo':
      return await changeCartInfo.main(event, context);
    case 'deleteCart':
      return await deleteCart.main(event, context);
    case 'addCart':
      return await addCart.main(event, context);
  }
};