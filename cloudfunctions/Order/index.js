const getOrderInfo = require('./getOrderInfo/index');
const changeOrderInfo = require('./changeOrderInfo/index');
const deleteOrder = require('./deleteOrder/index');
const addOrder = require('./addOrder/index');

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = event

  if (!OPENID) {
    return { status: 0, message: "缺少OPENID" }
  }
  switch (event.type) {
    case 'getOrderInfo':
      return await getOrderInfo.main(event, context);
    case 'changeOrderInfo':
      return await changeOrderInfo.main(event, context);
    case 'deleteOrder':
      return await deleteOrder.main(event, context);
    case 'addOrder':
      return await addOrder.main(event, context);
  }
};