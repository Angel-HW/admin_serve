const express = require('express')
const route = express.Router()
const db = require('../../dbConfig/dbConfig')
const url = require('url')

// 获取列表总数量
route.get('/getListCount', async(req, res) => {
  let sql = 'select count(*) as count from person'
  let sqlArr = []
  db(sql, sqlArr, function (_err, data) {
    if (_err) {
      res.json({
        status: '404',
        msg: 'fail',
        data: _err
      })
    } else {
      const results = data
      res.json({
        status: '200',
        msg: 'success',
        data: results
      })
    }
  })
})

// 获取数据
route.get('/getList', async(req, res) => {
  let obj = url.parse(req.url, true).query
  let startData = obj.startData*1
  let countData = obj.countData*1
  let sql = 'select * from person limit ?,?'
  let sqlArr = [startData, countData]
  // console.log(sqlArr)
  db(sql, sqlArr, function (_err, data) {
    if (_err) {
      res.json({
        status: '404',
        msg: 'fail',
        data: _err
      })
    } else {
      const results = data
      res.json({
        status: '200',
        msg: 'success',
        data: results
      })
    }
  })
})

// 新增
const { v1: uuidv1 } = require('uuid')
route.post('/addCategory', async(req, res) => {
  console.log('add')
  console.log(req)
  let name = await req.body.name
  let sql = 'insert into person (id, name) values (?,?)'
  let id = uuidv1().replace(/-/g, '')
  let sqlArr = [id,name]
  db(sql, sqlArr, function (_err, data) {
    if (_err) {
      res.json({
        status: '404',
        msg: 'fail',
        data: _err
      })
    } else {
      res.json({
        status: '200',
        msg: '插入成功',
        data: ''
      })
    }
    
  })
})

// 删除
route.get('/deleteData', async(req, res) => {
  let obj = url.parse(req.url, true);
  console.log(obj.query)
  let id = obj.query[0]
  let sql = 'delete from person where id = ?'
  let sqlArr = [id]
  db(sql, sqlArr, function (_err, data) {
    if (_err) {
      res.json({
        status: '404',
        msg: 'error',
        data: _err
      })
    } else {
      res.json({
        status: '200',
        msg: 'success',
        data: data
      })
    }
  })
})

// 修改数据
route.post('/editData', async(req, res) => {
  console.log('in editdata')
  let id = await req.body.dataId
  let name = await req.body.dataName
  console.log(id)
  const sql = 'update person set name=(?) where id = (?)'
  const sqlArr = [name, id]
  db(sql, sqlArr, function(_err, data) {
    if (_err) {
      res.json({
        status: '404',
        msg: 'fail',
        data: _err
      })
    } else {
      res.json({
        status: '200',
        msg: '修改成功',
        data: data
      })
    }
  })
})

// 搜索数据
route.post('/searchData', async(req, res) => {
  let obj = req.body
  console.log(obj)
  // let obj = url.parse(req.url, true).query
  let label = obj.label
  let input = obj.input
  let sql = 'select * from person where ' + label + ' like \'%' + input + '%\''
  let sqlArr = []
  console.log(sqlArr)
  db(sql, sqlArr, function(_err, data) {
    if (_err) {
      res.json({
        status: '404',
        msg: 'error',
        data: _err
      })
    } else {
      res.json({
        status: '200',
        msg: 'success',
        data: data
      })
    }
  })
})

module.exports = route