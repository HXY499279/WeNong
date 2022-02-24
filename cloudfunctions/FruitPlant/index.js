const getFruitPlantInfo = require('./getFruitPlantInfo/index');
const changeFruitPlantInfo = require('./changeFruitPlantInfo/index');
const deleteFruitPlant = require('./deleteFruitPlant/index');
const addFruitPlant = require('./addFruitPlant/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getFruitPlantInfo':
      return await getFruitPlantInfo.main(event, context);
    case 'changeFruitPlantInfo':
      return await changeFruitPlantInfo.main(event, context);
    case 'deleteFruitPlant':
      return await deleteFruitPlant.main(event, context);
    case 'addFruitPlant':
      return await addFruitPlant.main(event, context);
  }
};