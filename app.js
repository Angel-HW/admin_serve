const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const api = require('./routers/admin/api')
 
app.use(bodyParser.urlencoded({extended:false}));
 
app.use(bodyParser.json());
 
// 跨域问题解决
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
})

app.use(api)

app.listen(3000, function() {
  console.log('express 正在监听 3000 端口')
})