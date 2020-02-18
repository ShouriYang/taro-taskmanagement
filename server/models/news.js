const mongoose = require("../plugins/db");

//新建用户所有信息数据库字段
const NewsSchema = new mongoose.Schema({
    //消息内容
    info: { type: String, unique: true }, //定义类型，这样写还可以加别的参数
    //消息状态：已读/未读
    gender: { type: String },
    //消息产生者：任务领取人
    getter: { type: String },

});

const News = mongoose.model("News", NewsSchema); //定义一个user模型model，
module.exports = { News }; //导出一个对象，可以增加模型
