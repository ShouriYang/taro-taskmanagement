// 链接数据库
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
DB_URL = 'mongodb://localhost:27017/task-admin';

mongoose.connect(DB_URL, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
})
mongoose.set('useFindAndModify', false);
/**
  * 连接成功
  */
 mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + DB_URL);  
});    

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
 
/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});    

module.exports = mongoose;


// //定义并且建立模型
// const Task = mongoose.model("taskData", new mongoose.Schema({
//     publishDate: {
//         type: String
//     },
//     deadline: {
//         type: String
//     },
//     title: {
//         type: String
//     },
//     publishDate: {
//         type: String
//     },
//     requirement:{
//         type: String
//     },
//     requirementFile:{
//         type: String
//     },
//     submitFile:{
//         type: String
//     },
//     taskStatus: {
//         type: Number
//     },
//     getter:{
//         type: String
//     },
//     publisher:{
//         type: String
//     }
// }))

// module.exports = {Task};//导出一个对象，可以增加模型