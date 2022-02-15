const applyForMerchant = require('./applyForMerchant/index');
const getMerchantInfo = require('./getMerchantInfo/index');
const changeMerchantInfo = require('./changeMerchantInfo/index');
const deleteMerchant = require('./deleteMerchant/index');

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = event

  if (!OPENID) {
    return { status: 0, message: "缺少OPENID" }
  }
  switch (event.type) {
    case 'applyForMerchant':
      return await applyForMerchant.main(event, context);
    case 'getMerchantInfo':
      return await getMerchantInfo.main(event, context);
    case 'changeMerchantInfo':
      return await changeMerchantInfo.main(event, context);
    case 'deleteMerchant':
      return await deleteMerchant.main(event, context);
  }
};