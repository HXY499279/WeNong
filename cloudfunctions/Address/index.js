const getAddressInfo = require('./getAddressInfo/index');
const changeAddressInfo = require('./changeAddressInfo/index');
const deleteAddress = require('./deleteAddress/index');
const addAddress = require('./addAddress/index');

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = event

  if (!OPENID) {
    return { status: 0, message: "缺少OPENID" }
  }
  switch (event.type) {
    case 'getAddressInfo':
      return await getAddressInfo.main(event, context);
    case 'changeAddressInfo':
      return await changeAddressInfo.main(event, context);
    case 'deleteAddress':
      return await deleteAddress.main(event, context);
    case 'addAddress':
      return await addAddress.main(event, context);
  }
};