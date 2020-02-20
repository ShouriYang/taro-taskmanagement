const mongoose = require("../plugins/db");
Schema = mongoose.Schema;

//定义并且建立模型
const Task = mongoose.model("Task", new mongoose.Schema({
  //任务发布时间
  publishDate: {
    type: String
  },
  //截止日期
  deadLine: {
    type: String
  },
  //任务标题
  title: {
    type: String
  },
  requirement: {
    type: String
  },
  destination:{
    type: String
  },
  //所属校区
  school: {
    type: String
  },
  //任务状态
  taskStatus: {
    type: String
  },
  getter: {
    type: String
  },
  getterId: {
    type: String
  },
  publisher:{
    type: String
  },
  publisherId: {
    type: String
  }
    // requirementFile:{
  //     type: String
  // },
  // submitFile:{
  //     type: String
  // },
}))

module.exports = {
  Task
}; //导出一个对象，可以增加模型