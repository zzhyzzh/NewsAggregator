/*Author: Zihan Zhao*/
var mysql = require('mysql');
var pool = mysql.createPool({
      host : '127.0.0.1',
      user : 'root',
      password :'',
      database:'nodedb',
      port : 3306
  });
  
//可以监听connection事件，并设置session值
pool.on('connnection',function(connection){
  console.log("pool on");
  connection.query('SET SESSION auto_increment_increment=1')
});

function User(user){
  this.username = user.username;
  this.password = user.password;
  this.email = user.email;
}

User.prototype.userSave = function save(callback){
  var user = {
    username : this.username,
    password : this.password,
    email	 : this.email
  };
  var INSERT_USER= "INSERT INTO useraccount (USERID,USERNAME,password,email) VALUES (0,?,?,?)";
  pool.getConnection(function(err,connection){
    connection.query(INSERT_USER,[user.username,user.password,user.email],function(err,result){
      if(err){
        console.log("INSERT_USER Error: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
};

//根据用户名得到用户数量
User.prototype.userNum = function(username, callback) {
  pool.getConnection(function(err,connection){
    console.log("getConnection");
    console.log("getUserNumByName");
    var SELECT_NUM = "SELECT COUNT(1) AS num FROM useraccount WHERE USERNAME = ?";
    connection.query(SELECT_NUM, [username], function (err, result) {
      if (err) {
        console.log("SELECT_NUM Error: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
};

User.prototype.updateInfo  =function(callback){
	var user = {
    username : this.username,
    password : this.password,
    email : this.email
  };
  
  var UPDATE_INFO =
  "UPDATE useraccount SET EMAIL = ? WHERE USERNAME = ?";
  
  pool.getConnection(function(err,connection){
    connection.query(UPDATE_INFO,
	[user.email,user.username], function(err,result){
      if (err) {
        console.log("UPDATE_INFO Error: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
}

User.prototype.userInfo = function(callback){
 var user = {
    username : this.username,
    password : this.password,
    email : this.email
  };
 
  var SELECT_LOGIN ="SELECT * FROM useraccount WHERE USERNAME = ?";
  pool.getConnection(function(err,connection){
    connection.query(SELECT_LOGIN,[user.username],function(err,result){
      if (err) {
        console.log("SELECT_LOGIN Error: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
}

User.prototype.updatePassword = function(newpassword,callback){
	var user = {
    username : this.username,
    password : newpassword};
  
  var UPDATE_INFO =
  "UPDATE useraccount SET PASSWORD = ? WHERE USERNAME = ?";
  
  console.log("username: " + this.username);
  console.log("oldpassword: " + this.password);
  console.log("newpassword: " + newpassword);
  
  pool.getConnection(function(err,connection){
    connection.query(UPDATE_INFO,
	[user.password, user.username], function(err,result){
      if (err) {
        console.log("UPDATE_INFO Error: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
}

module.exports = User;
