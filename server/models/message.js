const mongoose = require("../plugins/db");

//新建用户所有信息数据库字段
const MessageSchema = new mongoose.Schema({
  date: { type: String },
  //任务标题
  taskTitle:{type:String},
  //任务描述
  taskDescrip:{type:String},
  //消息内容
  info: { type: String}, //定义类型，这样写还可以加别的参数
  //消息状态：已读/未读
  status: { type: String },
  //消息的拥有者
  owner: { type: String },
  //需要展示的个人信息
  user: { type: String },
  userId: { type: String },
  userAvatar: { type: String },
  userScore: { type: String },
  userWechat: { type: String }
});

const Message = mongoose.model("Message", MessageSchema); //定义一个user模型model，
module.exports = { Message }; //导出一个对象，可以增加模型
