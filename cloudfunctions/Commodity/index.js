const getCommodityInfo = require('./getCommodityInfo/index');
// const changeCommodityInfo = require('./changeCommodityInfo/index');
// const deleteCommodity = require('./deleteCommodity/index');

// 云函数入口函数
exports.main = async (event, context) => {

  switch (event.type) {
    case 'getCommodityInfo':
      return await getCommodityInfo.main(event, context);
    // case 'changeCommodityInfo':
    //   return await changeCommodityInfo.main(event, context);
    // case 'deleteCommodity':
    //   return await deleteCommodity.main(event, context);
  }
};