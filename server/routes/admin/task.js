module.exports = app =>{
const express = require('express');
const router = express.Router()
const assert = require('http-assert');
const {
    Task
  } = require('../../models/task'); //用解构的语法
  //新增任务
router.post('/', async (req, res) => {
    const task = await Task.create(req.body);
    res.send(task);
  });
  
  // 显示（查询）所有任务
router.get(
    '/',
      async (req, res) => {
        const tasks = await Task.find();
        res.send(tasks);
      }
  );
  
  // 在任务编辑页面显示该任务详情（接收参数）
  router.get('/:id', async (req, res) => {
    const tasks = await Task.findById(req.params.id);
    res.send(tasks);
  });
  
  // 在任务编辑页面修改任务（接收参数）
  router.put('/:id', async (req, res) => {
    const tasks = await Task.findByIdAndUpdate(req.params.id, req.body);
    res.send(tasks);
  });
  
  // 删除任务(接受参数)
  router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.send({
      status: true
    });
  });
// 登录校验中间件
const authMiddleware = require('../../middleware/auth')

app.use('/api/task',authMiddleware(),router)
// 错误处理函数
app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    });
  });
}