module.exports = app => {
  var express = require("express");
  var router = express.Router();
  const moment = require('moment')
  const { Task } = require('../models/task')
  const { User } = require('../models/user')
  //获取任务列表
  router.get('/', async (req,res) => {
    const tasks = await Task.find({
      status:'未领取'
    }).sort({publishDate:-1});
    res.send(tasks);
  });
  //上传任务
  router.post('/', async(req, res) => {
    const user = await User.findOne({
      openid: req.headers.token
    })
    const task = await Task.create({
      publishDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      deadline: req.body.deadline,
      title: req.body.title,
      description: req.body.description,
      destination: req.body.destination,
      school:req.body.school,
      status: '未领取',
      money: req.body.money,
      getter: '',
      getterId:'',
      publisher: user.nickName,
      publisherId: user.openid,
      publisherAvatar: user.avatarUrl
    });
    res.send(task)
  })
  //领取任务
  router.put('/:id',async(req,res)=>{
    const user = await User.findOne({
      openid: req.headers.token
    })
    const findTask = await Task.findById(req.params.id)
    if(findTask.status==='已领取'){
      res.status(201).send({
        message:'该任务已经被别人领取啦'
      })
    } else{
      const updateTask = await Task.findByIdAndUpdate(req.params.id,{
        getter: user.nickName,
        getterId: user.openid,
        status: '已领取'
      })
      res.send(updateTask)
    }
  })
  //获取任务列表中的用户评分
  router.get('/score/:id',async (req,res)=>{
    const user = await User.findOne({openid:req.params.id})
    console.log(user)
    if(user){
      res.send(user.score)
    }
    
  })
  //设置用户验证中间件
  const authMiddleware = require('../middleware/auth')
  app.use('/task',authMiddleware(), router);
  //统一错误处理
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    });
  });
}
  //测试多条件查询
    // await Task.find({$or:[{ publisher:"洋槐"},{getter:"洋槐"}]},(err,task)=>{
    //   console.log('或查询',task);
    //   res.send(task)
    // });
  //测试多表关联查询
    // router.get('/test', async (req,res) => {
    //   const group  = await User.aggregate([
    //     {
    //       $lookup:
    //         {
    //           from: "Task",
    //           localField: "openid",
    //           foreignField: "publisherId",
    //           as: "Tasks"
    //         }
    //    }
    //  ])
    //   console.log('group',group);
    // });
