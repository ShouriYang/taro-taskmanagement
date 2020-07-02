const express = require('express');
const app = express();
const cors = require('cors');

app.set('secret', 'dfasfdasdf');
//指定域名为8080跨域
// app.use(
//   require('cors')({
//     credentials: true,
//     origin: 'http://localhost:8080'
//   })
// );
// 让express识别客户端提交的json
app.use(cors());
app.use(express.json());

require('./routes/post')(app)
require('./routes/user')(app)
require('./routes/task')(app)
require('./routes/message')(app)
require('./routes/manage')(app)


app.listen(3000, () => console.log('http://localhost:3000/'));