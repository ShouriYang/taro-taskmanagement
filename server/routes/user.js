module.exports = app =>{
    var express = require("express");
    var router = express.Router();
    var request = require('request');
    //转发请求
    // router.get('/', function (req, res, next) {
    //     var url = 'https://www.fastmock.site/mock/264da5f11ee7aeba24acc29aa23d46f6/api/tasks';
    //     console.log('em')
    //     request(url, function (error, response, body) {
    //         if (!error && response.statusCode === 200) {
    //             var data = JSON.parse(body);
    //             console.log(data.data.tasks)
    //             res.send(data.data.tasks);
    //         } else {
    //             res.send('{error:404}');
    //         }
    //     });
    // });

    app.use('/user', router);
    app.get('/login/:id',(req,res)=>{
        const appid = "wx7f2fe1f0426cc358"  //开发者的appid
        const appsecret = "0f52aee2035af594a0809e0e8d54a7f0"   //开发者的appsecret 登入小程序公共平台内查看
        const code = req.params.id;
        console.log(code)
        const url  = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`;
        request(url, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                const data = JSON.parse(body);
                console.log('微信返回的数据',data);
                res.send(data);
            } else {
                res.send('{error:404}');
            }
        });
    })
}
