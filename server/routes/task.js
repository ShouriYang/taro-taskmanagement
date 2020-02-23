module.exports = app => {
  var express = require("express");
  var router = express.Router();
  const moment = require('moment')
  const { Task } = require('../models/task')
  const { User } = require('../models/user')
  router.get('/', async (req,res) => {
    const tasks = await Task.find().sort({publishDate:-1});
    console.log('task列表',tasks)
    res.send(tasks);
    // console.log(req.body,req.headers)
  });
  router.post('/', async(req, res) => {
    const user = await User.findOne({
      openid: req.headers.token
    })
    console.log('找到的user');
    console.log('请求创建的task',req.body);
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
      publisherId: user.id,
      publisherAvatar: user.avatarUrl
    });
    console.log('创建的task', task);
    res.send(task)
  })
  router.put('/:id',async(req,res)=>{
    const user = await User.findOne({
      openid: req.headers.token
    })
    console.log('找到的user',user);
    console.log('请求领取的task',req.params.id);
    const task = await Task.findByIdAndUpdate(req.params.id,{
      getter: user.nickName,
      getterId: user.openid,
      status: '已领取'
    })
    console.log('领取的task', task);
    res.send(task)
  })
  app.use('/task', router);
}
