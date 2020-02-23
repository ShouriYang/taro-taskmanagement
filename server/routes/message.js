module.exports = app =>{
  const express = require("express");
  const router = express.Router();
  const { Messgae} = require('../models/message')
  const {Task} = require('../models/task')
  router.get('/',async (req,res)=>{
    const messages = await Messgae.find().sort({date:1})
    console.log('获取的消息列表',messages);
    res.send(messages)
  })
  router.post('/:taskid',async (req,res)=>{
    const task = await Task.findById(req.params.taskid)
  })
  router.put('/:id',(req,res)=>{

  })

  app.use('/message', router);
}
