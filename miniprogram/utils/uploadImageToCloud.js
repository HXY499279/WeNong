// 获取一个唯一的数据作为id
const id = new Date().getTime() / 1000

// 结合云开发的存储，上传图片
const uploadFilePromise = (fileName, chooseResult) => {
  return wx.cloud.uploadFile({
    cloudPath: fileName,
    filePath: chooseResult.url
  });
}

const uploadImageToCloud = (fileList, categoryName) => {
  /* 
    参数说明：
      1.fileList是图片列表，
        fileList: [
          {
            url: ""
          }s
        ]
      2.categoryName是该组图片所属的文件夹名，例如 店铺认证报告
  */
  const OPENID = wx.getStorageSync('hasLoginOPENID')
  return new Promise((resolve, reject) => {
    wx.cloud.init();
    const uploadTasks = fileList.map((file, index) => uploadFilePromise(`${categoryName}/${OPENID}${id + index}.png`, file));
    Promise.all(uploadTasks)
      .then(data => {
        resolve(data)
      })
      .catch(e => {
        reject(e)
      });
  })
}

export default uploadImageToCloud
