const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { query: conditions = {} } = event

  try {
    console.log(conditions);
    const query = { ...conditions }
    const res = await db.collection("fruitPlants").where(query).get()
    const fruitPlants = res.data
    for (let item of fruitPlants) {
      item.age = (item.age / 365).toFixed(1)
    }
    return { status: 1, data: { fruitPlantInfo: fruitPlants }, message: "获取果苗信息成功" }
  } catch (error) {
    return { status: 0, message: "获取果苗信息失败" }
  }

}