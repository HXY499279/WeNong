const getSearchHistoryInfo = require('./getSearchHistoryInfo/index');
const addSearchHistory = require('./addSearchHistory/index');
const deleteSearchHistory = require('./deleteSearchHistory/index');

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = event

  if (!OPENID) {
    return { status: 0, message: "缺少OPENID" }
  }
  switch (event.type) {
    case 'getSearchHistoryInfo':
      return await getSearchHistoryInfo.main(event, context);
    case 'addSearchHistory':
      return await addSearchHistory.main(event, context);
    case 'deleteSearchHistory':
      return await deleteSearchHistory.main(event, context);
  }
};