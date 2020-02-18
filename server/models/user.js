const mongoose = require("../plugins/db");
// const bcrypt = require('bcryptjs')

//新建用户所有信息数据库字段
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true }, //定义类型，这样写还可以加别的参数
    //性别
    gender: { type: String },
    //微信号
    wechat: { type: String },
    //积分


});

const User = mongoose.model("User", UserSchema); //定义一个user模型model，
module.exports = { User }; //导出一个对象，可以增加模型
