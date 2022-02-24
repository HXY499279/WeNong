const getCategoryInfo = require('./getCategoryInfo/index');


// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getCategoryInfo':
      return await getCategoryInfo.main(event, context);
  }
};