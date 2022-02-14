// 结合云开发的存储，上传图片

const uploadFilePromise = (fileName, chooseResult) => {
  return wx.cloud.uploadFile({
    cloudPath: fileName,
    filePath: chooseResult.url
  });
}

const uploadImageToCloud = (fileList, fileName) => {
  /* 
    参数说明：
      1.fileList是图片列表，
        fileList: [
          {
            url: ""
          }s
        ]
      2.fileName是该组图片的署名，例如 店铺认证报告
  */
 const OPENID = wx.getStorageSync('hasLoginOPENID')
  return new Promise((resolve, reject) => {
    wx.cloud.init();
    const uploadTasks = fileList.map((file, index) => uploadFilePromise(`${OPENID}${fileName}${index}.png`, file));
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
