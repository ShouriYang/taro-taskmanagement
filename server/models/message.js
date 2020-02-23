const mongoose = require("../plugins/db");

//新建用户所有信息数据库字段
const MessageSchema = new mongoose.Schema({
  date: { type: String },
  //消息内容
  info: { type: String, unique: true }, //定义类型，这样写还可以加别的参数
  //消息状态：已读/未读
  status: { type: String },
  //消息产生者：任务领取人/发布人
  nickName: { type: String },
  //产生者id
  id: { type: String },
  //产生者头像
  avatarUrl: { type: String }

});

const Message = mongoose.model("Message", MessageSchema); //定义一个user模型model，
module.exports = { Message }; //导出一个对象，可以增加模型
