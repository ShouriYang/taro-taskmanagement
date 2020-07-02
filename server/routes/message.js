module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const { Message } = require('../models/message')
  const { Task } = require('../models/task')
  const { User } = require('../models/user')
  const moment = require('moment')

  //根据消息拥有者owner获取消息列表
  router.get('/', async (req, res) => {
    const messages = await Message.find({owner:req.headers.token}).sort({ date: -1 })
    res.send(messages)
  })

  //在用户领取完任务之后生成相应的领取消息
  router.post('/:taskid', async (req, res) => {
    const task = await Task.findById(req.params.taskid)
    //getter信息
    const from = await User.findOne({openid:task.getterId})
    //publisher信息
    const to = await User.findOne({openid:task.publisherId})
    //创建消息：发送给自己的消息
    const fromMessage = await Message.create({
      date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      info: `你领取了${task.publisher}的任务`,
      taskTitle: task.title,
      taskDescrip: task.description,
      owner: task.getterId,
      status: '未读',
      user: to.nickName,
      userId : to.openid,
      userAvatar: to.avatarUrl,
      userScore: to.score,
      userWechat : to.wechat,
    })
    console.log('领取人发送给自己的消息',fromMessage);
    await Message.create({
      date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      info: `${task.getter}领取了您的任务`,
      taskTitle: task.title,
      taskDescrip: task.description,
      owner: task.publisherId,
      status: '未读',
      user: from.nickName,
      userId : from.openid,
      userAvatar: from.avatarUrl,
      userScore: from.score,
      userWechat : from.wechat,
    }, (err, message) => {
      console.log('领取人发送给发布者的消息', message);
    })

  })
  //用户删除消息
  router.delete('/:id', async(req, res) => {
  console.log('messageid',req.params.id);
   const result =  await Message.findByIdAndDelete(req.params.id)
   res.send(result)
  })
  //中间件
  const authMiddleware = require('../middleware/auth')
  app.use('/message',authMiddleware(), router);
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    });
  });
}
