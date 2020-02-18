module.exports = app =>{
const express = require('express');
const router = express.Router()
const assert = require('http-assert');
    //上传文件
const multer = require('multer');
const fs = require('fs');
// const upload = multer({ dest: __dirname + '/uploads' });
var upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const url = __dirname + '/uploads';
      cb(null, url);
    },
    filename: function (req, file, cb) {
      //file.originalname上传文件的原始文件名
      var fileNameArr = file.originalname.split('.');
      var suffix = fileNameArr[fileNameArr.length - 1];
      var changedName =
        fileNameArr[0] + '-' + new Date().getTime() + '.' + suffix;
      cb(null, changedName);
    }
  })
});

router.post('/upload', upload.single('file'), async (req, res) => {
    console.log('上传文件')
  const file = req.file;
  if (file) {
    file.url = `http://localhost:3000/uploads/${file.filename}`;
  }
  res.send(file);
});
//删除文件
router.post('/delete/', async (req, res) => {
  console.log('yonghu' + req.body._id);
  fs.unlinkSync(`./server/uploads/${req.body.requirementFile.split('/')[4]}`);
  await Task.findByIdAndUpdate(
    req.body._id, {
      requirementFile: null
    }, {
      new: true
    }
  );
  res.send({
    status: true
  });
});
router.post('/delete/change', async (req, res) => {
  console.log('yonghu' + req.body._id);
  fs.unlinkSync(`./server/uploads/${req.body.requirementFile.split('/')[4]}`);
  await Task.findByIdAndUpdate(
    req.body._id, {
      requirementFile: null
    }, {
      new: true
    }
  );
  res.send({
    status: true
  });
});
app.use('/api',router)
app.use('/uploads', express.static(__dirname + '/uploads'));

// 错误处理函数
app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    });
  });
}