const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {

  const { query = {}, skip, limit } = event
  try {
    const res = skip || limit ? await db.collection("commodities").where(query).skip(skip).limit(limit).get() : await db.collection("commodities").where(query).get()
    const commodities = res.data
    const retData = []
    if (commodities.length) {
      for (let commodity of commodities) {
        const { merchantId, categoryId } = commodity
        // 获取商品所属商家的信息
        const { result = {} } = await cloud.callFunction({
          name: "Merchant",
          data: {
            type: "getMerchantInfo",
            OPENID: merchantId
          }
        })
        const { merchantInfo } = result.data
        // 获取分类名
        const item = await db.collection("categories").where({_id:categoryId}).get()
        const { categoryName } = item.data[0]

        retData.push({ ...commodity, merchantInfo, categoryName })
      }
    }
    return { status: 1, data: { commodityInfo: retData }, message: "获取商品信息成功" }
  } catch (error) {
    console.log(error);
    return { status: 0, message: "获取商品信息失败" }
  }

}