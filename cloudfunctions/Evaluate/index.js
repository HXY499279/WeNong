const getEvaluateInfo = require('./getEvaluateInfo/index');
const changeEvaluateInfo = require('./changeEvaluateInfo/index');
const deleteEvaluate = require('./deleteEvaluate/index');
const addEvaluate = require('./addEvaluate/index');

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = event

  if (!OPENID) {
    return { status: 0, message: "缺少OPENID" }
  }
  switch (event.type) {
    case 'getEvaluateInfo':
      return await getEvaluateInfo.main(event, context);
    case 'changeEvaluateInfo':
      return await changeEvaluateInfo.main(event, context);
    case 'deleteEvaluate':
      return await deleteEvaluate.main(event, context);
    case 'addEvaluate':
      return await addEvaluate.main(event, context);
  }
};