const getInfo = require('./getInfo/index');

// 云函数入口函数
exports.main = async (event, context) => {
 
  switch (event.type) {
    case 'getInfo':
      return await getInfo.main(event, context);
  }
};