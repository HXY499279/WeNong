const wxLogin = require('./wxLogin/index');
const checkLogin = require('./checkLogin/index');


// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'wxLogin':
      return await wxLogin.main(event, context);
    case 'checkLogin':
      return await checkLogin.main(event, context);
  }
};