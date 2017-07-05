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
  this.username	 = user.username;
  this.password	 = user.password;
  this.email	 = user.email;  
  this.newsProri = user.newsProri;
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
    email : this.email,
	newsProri : this.newsProri
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
    password : this.password};
  
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

User.prototype.setLike  =function(checklist, callback){
	var user = {
		username : this.username,
		password : this.password,
		email : this.email
	};
	var society		 = 0;
	var world			 = 0;
	var entertainment	 = 0;
	var technology	 = 0;
	var sport			 = 0;
	var car			 = 0;
	var finance		 = 0;	
	var funny			 = 0;	
	var military		 = 0;
	var fashion		 = 0;	
	var discovery		 = 0;
	var regimen		 = 0;
	var history		 = 0;
	var travel		 = 0; 
	var game			 = 0; 
	var food			 = 0; 
	for(var i=0; i <checklist.length; i++)
	{
		switch(checklist[i])
		{
			case "society" 		 : society = 10;break;
			case "world"		 : world = 10;break;
			case "entertainment" : entertainment = 10;break;
			case "technology"	 : technology = 10;break;
			case "sport"		 : sport = 10;break;
			case "car"			 : car = 10;break;
			case "finance"		 : finance = 10;break;
			case "funny"		 : funny = 10;	break;
			case "military"		 : military = 10;break;
			case "fashion"		 : fashion = 10;	break;
			case "discovery"	 : discovery = 10;break;
			case "regimen"		 : regimen = 10;break;
			case "history"		 : history = 10;break;
			case "travel"		 : travel = 10; break;
			case "game"			 : game = 10; break;
			case "food"			 : food = 10; break;
		}
		console.log(checklist[i]);		
	}
	console.log(society);
 var UPDATE_INFO =
  "UPDATE useraccount SET SOCIETY = ?, WORLD = ?, ENTERTAINMENT = ?, TECHNOLOGY = ?, SPORT = ?, CAR = ?, FINANCE = ?, FUNNY = ?, MILITARY = ?, FASHION = ?, DISCOVERY = ?, REGIMEN = ?, HISTORY = ?, TRAVEL = ?, GAME = ?, FOOD = ? WHERE USERNAME = ?";
  
  pool.getConnection(function(err,connection){
    connection.query(UPDATE_INFO,
	[society,world,entertainment,technology,sport,car,finance,funny,military,fashion,discovery,regimen,history,travel,game,food,user.username], function(err,result){
      if (err) {
        console.log("UPDATE_INFO Error: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
}

User.prototype.updateLike  =function(newsProri, callback){
	var user = {
		username : this.username,
		password : this.password,
		email : this.email
	};	
	var UPDATE_INFO =
	"UPDATE useraccount SET SOCIETY = ?, WORLD = ?, ENTERTAINMENT = ?, TECHNOLOGY = ?, SPORT = ?, CAR = ?, FINANCE = ?, FUNNY = ?, MILITARY = ?, FASHION = ?, DISCOVERY = ?, REGIMEN = ?, HISTORY = ?, TRAVEL = ?, GAME = ?, FOOD = ? WHERE USERNAME = ?";
  
  pool.getConnection(function(err,connection){
    connection.query(UPDATE_INFO,
	[newsProri.society,newsProri.world,newsProri.entertainment,newsProri.technology,newsProri.sport,newsProri.car,newsProri.finance,newsProri.funny,newsProri.military,newsProri.fashion,newsProri.discovery,newsProri.regimen,newsProri.history,newsProri.travel,newsProri.game,newsProri.food,user.username], function(err,result){
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
