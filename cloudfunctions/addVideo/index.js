// 云函数入口文件
const cloud = require('wx-server-sdk')
// 先初始化云
cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {

  return await db.collection('videoList').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        videoURL: event.url
      }
    });
}