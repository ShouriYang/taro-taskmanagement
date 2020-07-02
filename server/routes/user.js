module.exports = app =>{
    var express = require("express");
    var router = express.Router();
    var request = require('request');
    const {User} = require('../models/user')
    //创建用户
    router.post('/',async (req,res)=>{
        console.log('传来的user',req.body)
        //判断是否有这个用户
        const isUser = await User.findOne({
            openid: req.headers.token
          });
        console.log('findOne返回的user',isUser);
        //该用户存在
        if(isUser){
          res.status(201).send(isUser)
        }else{
        //该用户不存在
            const user = await User.create({
                openid: req.headers.token,
                avatarUrl:req.body.avatarUrl,
                nickName: req.body.nickName,
                gender: req.body.gender,
                wechat: '',
                score: 0,
                count: 0,
                total: 0,
            });
            console.log('返回的user1',user);
            res.send(user);
        }
    })
    //获取用户信息
    router.get('/',async(req,res)=>{
      const user = await User.findOne({
        openid:req.headers.token
      })
      res.send(user);
    })
    //修改用户联系方式
    router.put('/',async(req,res)=>{
      const user = await User.update({openid:req.body.openid},{
        wechat:req.body.wechat
      })
      res.send(user)
    })
    app.use('/user', router);
    //用户授权后获取唯一的openid
    app.get('/login/:id',(req,res)=>{
        const appid = "wx7f2fe1f0426cc358"  //开发者的appid
        const appsecret = "0f52aee2035af594a0809e0e8d54a7f0"   //开发者的appsecret 登入小程序公共平台内查看
        const code = req.params.id;
        const url  = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`;
        request(url, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                const data = JSON.parse(body);
                // console.log('微信返回的数据',data);
                res.send(data);
            } else {
                res.send('{error:404}');
            }
        });
    })
    //错误统一处理
    app.use(async (err, req, res, next) => {
      res.status(err.statusCode || 500).send({
        message: err.message
      });
    });
}
