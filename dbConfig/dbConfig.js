var mysql = require('mysql')

let config = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'lol'
}

let pool = mysql.createPool(config)

var query = function(sql,options,callback){
  // console.log('in query')
  pool.getConnection(function(err,conn){
    if(err){
      callback(err,null,null);
    }else{
      conn.query(sql,options,function(err,results){
        // console.log('in getConnection')
        //释放连接  
        conn.release();
        //事件驱动回调  
        callback(err,results);
      });
    }
  });
}

module.exports = query;