const mongoose = require("../plugins/db");

//新建用户所有信息数据库字段
const PostSchema = new mongoose.Schema({
    //帖子标题
    title: {
        type: String,
        unique: true
    }, //定义类型，这样写还可以加别的参数
    //内容
    content: {
        type: String
    },
    //创建时间
    createTime: {
        type: String
    },
    //发帖人
    publisher: {
        type: String
    },
    //获得点赞数
    star: {
        type: String
    }
});

const User = mongoose.model("User", UserSchema); //定义一个user模型model，
module.exports = {
    User
}; //导出一个对象，可以增加模型