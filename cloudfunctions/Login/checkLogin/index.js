const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});


exports.main = async (event, context) => {
  return { status: 1, message: "检验成功" }
}