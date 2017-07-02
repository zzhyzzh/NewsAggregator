var express = require('express');
var request = require("request");
var User = require("../models/user.js");
var User = require("../models/news.js");
var router = express.Router();

function isString(str){
	return (typeof str=='string')&&str.constructor==String;
}
function News(newsAgg){
  this.hot 		= newsAgg.hot;
  this.society	= newsAgg.society;
  this.world		 = newsAgg.world;
  this.entertainment = newsAgg.entertainment;
  this.technology	 = newsAgg.technology;
  this.sport		 = newsAgg.sport;
  this.car			 = newsAgg.car;
  this.finance		 = newsAgg.finance;
  this.funny		 = newsAgg.funny;
  this.military		 = newsAgg.military;
  this.fashion		 = newsAgg.fashion;
  this.discovery	 = newsAgg.discovery;
  this.regimen		 = newsAgg.regimen;
  this.history		 = newsAgg.history;
  this.travel		 = newsAgg.travel;
  this.game			 = newsAgg.game;
  this.food			 = newsAgg.food;
  
}

var newsAgg = new News({
	hot : "",
	society : "",
	sport : "",
	entertainment : "",
	world : "",
	technology : "",
	car : "",
	finance : "",
	funny : "",
	military : "",
	fashion : "",
	discovery : "",
	regimen : "",
	history : "",
	travel : "",
	game : "",
	food : ""
});
var url_hot = "http://www.toutiao.com/api/article/recent/?source=2&category=news_hot&as=A1D5D87595C3287"
var url_society = "http://www.toutiao.com/api/article/recent/?source=2&category=news_society&as=A1D5D87595C3287"
var url_sport = "http://www.toutiao.com/api/article/recent/?source=2&category=news_sports&as=A1D5D87595C3287"
var url_entertainment = "http://www.toutiao.com/api/article/recent/?source=2&category=news_entertainment&as=A1D5D87595C3287"
var url_world = "http://www.toutiao.com/api/article/recent/?source=2&category=news_world&as=A1D5D87595C3287"
var url_technology = "http://www.toutiao.com/api/article/recent/?source=2&category=news_tech&as=A1D5D87595C3287"
var url_car = "http://www.toutiao.com/api/article/recent/?source=2&category=news_car&as=A1D5D87595C3287"
var url_finance = "http://www.toutiao.com/api/article/recent/?source=2&category=news_finance&as=A1D5D87595C3287"
var url_funny = "http://www.toutiao.com/api/article/recent/?source=2&category=funny&as=A1D5D87595C3287"
var url_military = "http://www.toutiao.com/api/article/recent/?source=2&category=news_military&as=A1D5D87595C3287"
var url_fashion = "http://www.toutiao.com/api/article/recent/?source=2&category=news_fashion&as=A1D5D87595C3287"
var url_discovery = "http://www.toutiao.com/api/article/recent/?source=2&category=news_discovery&as=A1D5D87595C3287"
var url_regimen = "http://www.toutiao.com/api/article/recent/?source=2&category=news_regimen&as=A1D5D87595C3287"
var url_history = "http://www.toutiao.com/api/article/recent/?source=2&category=news_history&as=A1D5D87595C3287"
var url_travel = "http://www.toutiao.com/api/article/recent/?source=2&category=news_travel&as=A1D5D87595C3287"
var url_game = "http://www.toutiao.com/api/article/recent/?source=2&category=news_game&as=A1D5D87595C3287"
var url_food = "http://www.toutiao.com/api/article/recent/?source=2&category=news_food&as=A1D5D87595C3287"

function NewsGet(url,catagory){
	//newsList(hot news)
	var newsList = new Array("","","","");
	v = request(
		{url: url, json: true}, 
		function (error, response, body)
		{
			if (!error && response.statusCode === 200) 
			{
				var j=0;	
				for(var i=0;i<body.data.length&&j<4;i++)
				{				
					console.log("i: "+i);
					console.log("j: "+j);
					if(body.data[i].has_image==true)
					{
						newsList[j] = body.data[i];
						if(isString(newsList[j].middle_image))
						{			
							var url_image = newsList[j].middle_image;
							url_image = url_image.replace("list", "large");
							newsList[j].middle_image = url_image;
							//console.log(newsList[j].middle_image);
						}
						else
						{
							var url_image = newsList[j].middle_image.url;
							url_image = url_image.replace("list", "large");
							newsList[j].middle_image = url_image;
							//console.log(newsList[j].middle_image);
						}
						j++;
					}
				}			
			}
			//console.log(newsList[0]);			
			switch(catagory)
			{
			case "hot":
				newsAgg.hot = newsList;
				break;
			case "society":
				newsAgg.society = newsList;	
				break;
			case "sport":
				newsAgg.sport = newsList;
				break;			
			case "entertainment":
				newsAgg.entertainment = newsList;
				break;				
			case "world":
				newsAgg.world = newsList;
				break;				
			case "technology":
				newsAgg.technology = newsList;
				break;				
			case "car":
				newsAgg.car = newsList;
				break;				
			case "finance":
				newsAgg.finance = newsList;
				break;				
			case "funny":
				newsAgg.funny = newsList;
				break;				
			case "military":
				newsAgg.military = newsList;
				break;				
			case "fashion":
				newsAgg.fashion = newsList;
				break;					
			case "discovery":
				newsAgg.discovery = newsList;
				break;				
			case "regimen":
				newsAgg.regimen = newsList;
				break;					
			case "history":
				newsAgg.history = newsList;
				break;					
			case "travel":
				newsAgg.travel = newsList;
				break;					
			case "game":
				newsAgg.game = newsList;
				break;				
			case "food":
				newsAgg.food = newsList;
				break;					
			}
		}
	);
}
NewsGet(url_hot,"hot");
NewsGet(url_society,"society");
NewsGet(url_sport,"sport");
NewsGet(url_entertainment,"entertainment");
NewsGet(url_world,"world");
NewsGet(url_technology,"technology");
NewsGet(url_car,"car");
NewsGet(url_finance,"finance");
NewsGet(url_funny,"funny");
NewsGet(url_military,"military");
NewsGet(url_fashion,"fashion");
NewsGet(url_discovery,"discovery");
NewsGet(url_regimen,"regimen");
NewsGet(url_history,"history");
NewsGet(url_travel,"travel");
NewsGet(url_game,"game");
NewsGet(url_food,"food");

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render
	(
		'index', 
		{
			errMsg: '',
			username:'',
			newsAgg:newsAgg
		}
	);
});

router.post("/",function(req, res) {
    //获取form表单提交的登录数据
    var username = req.body.username;
    var password = req.body.password;
    console.log(username);
    var login = new User({
		username : username,
		password : password
	});
    //通过用户名取到用户信息
    login.userInfo(function(err,result){
        if(err){
            var user = {'username':''};
            //res.send({code: 0, msg: err, userinfo : user});
            res.render('index', {errMsg: err, username:'',newsAgg:newsAgg});			
            return;
        }
		console.log(result);
        if(result == ''){
            var user = {'username':''};
            res.locals.status = "fail";
            console.log('* 用户名或密码错误');
            //res.send({code: 0, msg: ' * 用户名或密码错误', userinfo : user});
            res.render('index', {errMsg: ' * 用户名或密码错误',username:"",newsAgg:newsAgg});
        }
        else{
            if(result[0]['password'] == password){
				//判断用户状态				
				var user = {'username':username};					
				req.session.user = user;//保存用户session信息
				//res.send({code: 1, msg: ' * 登录成功', userinfo : user});
				res.render('index', {errMsg: ' * 登录成功',username:user.username,newsAgg:newsAgg});
				//console.log('登陆成功');
			}	
            else{
                var user = {'username':''};
                res.locals.status = "fail";
                console.log('* 用户名或密码错误');
                console.log(res.locals.status);
				//res.send({code: 0, msg: ' * 用户名或密码错误', userinfo : user});
                res.render('index', {errMsg: ' * 用户名或密码错误',username:"",newsAgg:newsAgg});
            }
        }		
        res.end();
    });
});

module.exports = router;
