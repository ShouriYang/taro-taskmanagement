module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const { Task } = require('../models/task')
  const { User } = require('../models/user')
  const moment = require('moment')
  //统计并获取发布任务和领取任务的数量
  router.get('/', async (req, res) => {
    //统计各种发布任务的数量
    const publishNumber = {}
    let notGet = await Task.find({ publisherId: req.headers.token, status: '未领取' })
    publishNumber.notGet = notGet.length
    let haveGet = await Task.find({ publisherId: req.headers.token, status: '已领取' })
    publishNumber.haveGet = haveGet.length
    let getConfirm = await Task.find({ publisherId: req.headers.token, status: '领取者已确认' })
    publishNumber.getConfirm = getConfirm.length
    let publishConfirm = await Task.find({ publisherId: req.headers.token, status: '发布者已确认' })
    publishNumber.publishConfirm = publishConfirm.length
    //统计各种接收任务的数量
    const getNumber = {}
    haveGet = await Task.find({ getterId: req.headers.token, status: '已领取' })
    getNumber.haveGet = haveGet.length
    getConfirm = await Task.find({ getterId: req.headers.token, status: '领取者已确认' })
    getNumber.getConfirm = getConfirm.length
    publishConfirm = await Task.find({ getterId: req.headers.token, status: '发布者已确认' })
    getNumber.publishConfirm = publishConfirm.length
    // console.log({publishNumber,getNumber});
    res.send({ publishNumber, getNumber })

  })
  //根据用户需要获取不同状态的发布/领取任务列表
  //need代表任务列表的种类，0为发布列表，1为领取列表
  //status代表获取哪种状态的任务列表
  router.get('/:need/:status', async (req, res) => {
    let { need, status } = req.params
    if (need === '0') {
      switch (status) {
        case '0': status = '未领取'
          break;
        case '1': status = '已领取'
          break;
        case '2': status = '领取者已确认'
          break;
        case '3': status = '发布者已确认'
          break;
        default:
          break;
      }
      const publishList = await Task.find({ publisherId: req.headers.token, status: status }).sort({ publishDate: -1 })
      res.send(publishList)
    } else if (need === '1') {
      switch (status) {
        case '1': status = '已领取'
          break;
        case '2': status = '领取者已确认'
          break;
        case '3': status = '发布者已确认'
          break;
        default:
          break;
      }
      const getList = await Task.find({ getterId: req.headers.token, status: status }).sort({ publishDate: -1 })
      res.send(getList)
    }
  })

  //在任务管理中心点击确认完成从而改变任务状态
  router.put('/task/:id', async (req, res) => {
    // console.log('传来的状态', req.body);
    const task = await Task.findByIdAndUpdate(req.params.id,{
      status: req.body.status
    })
    res.send(task)
  })
  //为用户打分
  router.put('/user/:id',async(req,res)=>{
    //id为getterId/publisherId
    await User.where({openid:req.params.id}).update({$inc:{total:req.body.score}})
    await User.where({openid:req.params.id}).update({$inc:{count:1}})
    const user = await User.findOne({openid:req.params.id})
    const average = parseFloat(user.total/user.count)
    const result = await User.findOneAndUpdate({openid:req.params.id},{
      score:average
    })
    res.send(result)
  })

  //在任务未被领取之前删除任务
  router.delete('/task/:id',async(req,res)=>{
    const task = await Task.findByIdAndDelete(req.params.id)
    console.log('task',task);
    res.send(task)
  })

  //中间件
  const authMiddleware = require('../middleware/auth')
  app.use('/manage',authMiddleware(), router);
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    });
  });
}
