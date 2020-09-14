# 信息管理服务端 - mysql数据库
## [对应客户端](https://github.com/Angel-HW/admin_web)
### 2020.8.24
* 问题1：跨域问题
* 解决方法：在创建服务器时加入如下代码，详细见 `app.js` 文件
```js
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
```
### 2020.8.25
* 问题：mysql生成随机id：`uuid()`函数,  
  出现 `the used storage engine can not index column 'id'`
* 解决方法：字段长度为0的原因，修改字段长度即可
***
### 2020.8.26 (#jump)
* 问题：查看post请求用 `body-parser`中间件，详情见 `routers/admin/api.js`;   
get 详情见<span id="jump"> 2020.8.31 </span>
* 问题：`console.log('req:' + req.body)` 会报错，`req.body` 是对象，非字符串   
* 问题：`uuid()` 随机数生成
***
### 2020.8.31
* 问题：数据封装返回给前端
* 解决方式：
```js
res.json({
  status: '200',
  msg: 'success',
  data: data
})
```
* 问题：查看get请求方式的参数：`url` 第三方包 `let obj = url.parse(req.url, true);`,详情见 `routers/admin/api.js`;   
post 详情见<span id="jump"> 2020.8.26 </span>