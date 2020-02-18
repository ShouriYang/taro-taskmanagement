const mongoose = require("../plugins/db");
    Schema = mongoose.Schema;

//定义并且建立模型
const Task = mongoose.model("Task", new mongoose.Schema({
    publishDate: {
        type: String
    },
    deadLine: {
        type: String
    },
    title: {
        type: String
    },
    requirement:{
        type: String
    },
    // requirementFile:{
    //     type: String
    // },
    // submitFile:{
    //     type: String
    // },
    taskStatus: {
        type: String
    },
    getter:{
        type: String
    },
    getterEmail:{
        type: String
    },
    publisher:{
        type: String
    },
    publisherEmail:{
        type: String
    },
}))

module.exports = {Task};//导出一个对象，可以增加模型