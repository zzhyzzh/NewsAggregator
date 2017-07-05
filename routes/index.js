var express = require('express');
var request = require("request");
var User = require("../models/user.js");
//var NewsProri = require("../models/user.js");
var router = express.Router();

function isString(str){
	return (typeof str=='string')&&str.constructor==String;
}
function News(newsAgg){
  this.hot 			 = newsAgg.hot;
  this.society		 = newsAgg.society;
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
function NewsProri(newsProri){
  this.society		 = newsProri.society;
  this.world		 = newsProri.world;
  this.entertainment = newsProri.entertainment;
  this.technology	 = newsProri.technology;
  this.sport		 = newsProri.sport;
  this.car			 = newsProri.car;
  this.finance		 = newsProri.finance;
  this.funny		 = newsProri.funny;
  this.military		 = newsProri.military;
  this.fashion		 = newsProri.fashion;
  this.discovery	 = newsProri.discovery;
  this.regimen		 = newsProri.regimen;
  this.history		 = newsProri.history;
  this.travel		 = newsProri.travel;
  this.game			 = newsProri.game;
  this.food			 = newsProri.food;
}
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
						console.log(newsList[j].item_seo_url.slice(0,5));
						if(newsList[j].item_seo_url.slice(0,2)=="/i"&&newsList[j].item_seo_url.slice(0,5)!="/item")
						{
							var item_seo_url = newsList[j].item_seo_url;
							item_seo_url = item_seo_url.replace("/i", "/item/");
							newsList[j].item_seo_url = item_seo_url;
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
		console.log("完毕: " + catagory);
		}
	);
}
NewsGet(url_hot,"hot");
NewsGet(url_society,"society");
NewsGet(url_world,"world");
NewsGet(url_technology,"technology");
NewsGet(url_sport,"sport");
NewsGet(url_entertainment,"entertainment");
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

var showList = new Array("society","world","technology","entertainment","sport","finance");
/* GET home page. */
router.get('/', function(req, res, next) {
	var username;
	var newsProri;
	if (req.session.user !=  null)
	{
		username = req.session.user.username;//用户session信息
		newsProri = req.session.user.newsProri;
			
		var max;
		var maxMark;
		
		var societyIn = false;
		var worldIn = false;
		var technologyIn = false;
		var entertainmentIn = false;
		var sportIn = false;
		var financeIn = false;
		var carIn = false;
		var funnyIn = false;
		var militaryIn = false;
		var fashionIn = false;
		var discoveryIn = false;
		var regimenIn = false;
		var historyIn = false;
		var travelIn = false;
		var gameIn = false;
		var foodIn = false;
		for(var i=0; i<6; i++)
		{
			if(!societyIn)
			{
				maxMark = "society";
				max = newsProri.society;
			}
			else if(!worldIn)
			{
				maxMark = "world";
				max = newsProri.world;
			}	
			else if(!technologyIn)
			{
				maxMark = "technology";
				max = newsProri.technology;
			}	
			else if(!entertainmentIn)
			{
				maxMark = "entertainment";
				max = newsProri.entertainment;
			}	
			else if(!sportIn)
			{
				maxMark = "sport";
				max = newsProri.sport;
			}	
			else if(!financeIn)
			{
				maxMark = "finance";
				max = newsProri.finance;
			}	
			else if(!carIn)
			{
				maxMark = "car";
				max = newsProri.car;
			}	
			else if(!funnyIn)
			{
				maxMark = "funny";
				max = newsProri.funny;
			}	
			else if(!militaryIn)
			{
				maxMark = "military";
				max = newsProri.military;
			}	
			else if(!fashionIn)
			{
				maxMark = "fashion";
				max = newsProri.fashion;
			}	
			else if(!discoveryIn)
			{
				maxMark = "discovery";
				max = newsProri.discovery;
			}	
			else if(!regimenIn)
			{
				maxMark = "regimen";
				max = newsProri.regimen;
			}	
			else if(!historyIn)
			{
				maxMark = "history";
				max = newsProri.history;
			}	
			else if(!travelIn)
			{
				maxMark = "travel";
				max = newsProri.travel;
			}	
			else if(!gameIn)
			{
				maxMark = "game";
				max = newsProri.game;
			}	
			else if(!foodIn)
			{
				maxMark = "food";
				max = newsProri.food;
			}	
			if(newsProri.world>max && !worldIn)
			{
				maxMark = "world";
				max = newsProri.world;
			}	
			if(newsProri.entertainment>max && !entertainmentIn)
			{
				maxMark = "entertainment";
				max = newsProri.entertainment;
			}	if(newsProri.technology>max && !technologyIn)
			{
				maxMark = "technology";
				max = newsProri.technology;
			}	if(newsProri.sport>max && !sportIn)
			{
				maxMark = "sport";
				max = newsProri.sport;
			}	if(newsProri.car>max && !carIn)
			{
				maxMark = "car";
				max = newsProri.car;
			}	if(newsProri.finance>max && !financeIn)
			{
				maxMark = "finance";
				max = newsProri.finance;
			}	if(newsProri.funny>max && !funnyIn)
			{
				maxMark = "funny";
				max = newsProri.funny;
			}	if(newsProri.military>max && !militaryIn)
			{
				maxMark = "military";
				max = newsProri.military;
			}	if(newsProri.fashion>max && !fashionIn)
			{
				maxMark = "fashion";
				max = newsProri.fashion;
			}	if(newsProri.discovery>max && !discoveryIn)
			{
				maxMark = "discovery";
				max = newsProri.discovery;
			}	if(newsProri.regimen>max && !regimenIn)
			{
				maxMark = "regimen";
				max = newsProri.regimen;
			}	if(newsProri.history>max && !historyIn)
			{
				maxMark = "history";
				max = newsProri.history;
			}	if(newsProri.travel>max && !travelIn)
			{
				maxMark = "travel";
				max = newsProri.travel;
			}	if(newsProri.game>max && !gameIn)
			{
				maxMark = "game";
				max = newsProri.game;
			}	if(newsProri.food>max && !foodIn)
			{
				maxMark = "food";
				max = newsProri.food;
			}
			showList[i] = maxMark;
			console.log("showList: " + showList);
			switch(maxMark)
			{
				case "society" : societyIn = true; break;
				case "world" : worldIn = true; break;
				case "entertainment" : technologyIn = true; break;
				case "technology" : entertainmentIn = true; break;
				case "sport" : sportIn = true; break;
				case "car" : financeIn = true; break;
				case "finance" : carIn = true; break;
				case "funny" : funnyIn = true; break;
				case "military" : militaryIn = true; break;
				case "fashion" : fashionIn = true; break;
				case "discovery" : discoveryIn = true; break;
				case "regimen" : regimenIn = true; break;
				case "history" : historyIn = true; break;
				case "travel" : travelIn = true; break;
				case "game" : gameIn = true; break;
				case "food" : foodIn = true; break;
			}
		}	
	}	
	else username = "";
	console.log("username: " + username);
	console.log(showList);
	res.render
	(
		'index', 
		{
			errMsg: '',
			username:username,
			newsAgg:newsAgg,
			showList:showList
		}
	);
});

router.post("/",function(req, res) {
    //获取form表单提交的登录数据
    var username = req.body.username;
    var password = req.body.password;
	var newsProri = new NewsProri({
		society : 0,
		sport : 0,
		entertainment : 0,
		world : 0,
		technology : 0,
		car : 0,
		finance : 0,
		funny : 0,
		military : 0,
		fashion : 0,
		discovery : 0,
		regimen : 0,
		history : 0,
		travel : 0,
		game : 0,
		food : 0
	});
    console.log(newsProri);
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
            res.render('index', {errMsg: err, username:'',newsAgg:newsAgg,
			showList:showList});			
            return;
        }
		console.log(result);
        if(result == ''){
            var user = {'username':''};
            res.locals.status = "fail";
            console.log('* 用户名或密码错误');
            //res.send({code: 0, msg: ' * 用户名或密码错误', userinfo : user});
            res.render('index', {errMsg: ' * 用户名或密码错误',username:"",newsAgg:newsAgg,
			showList:showList});
        }
        else{
            if(result[0]['password'] == password){
				//判断用户状态
				console.log(result);
				newsProri.society		 = result[0].society;
				newsProri.world			 = result[0]['world'];
				newsProri.entertainment  = result[0]['entertainment'];
				newsProri.technology	 = result[0]['technology'];
				newsProri.sport			 = result[0]['sport'];
				newsProri.car			 = result[0]['car'];
				newsProri.finance		 = result[0]['finance'];
				newsProri.funny			 = result[0]['funny'];
				newsProri.military		 = result[0]['military'];
				newsProri.fashion		 = result[0]['fashion'];
				newsProri.discovery		 = result[0]['discovery'];
				newsProri.regimen		 = result[0]['regimen'];
				newsProri.history		 = result[0]['history'];
				newsProri.travel		 = result[0]['travel'];
				newsProri.game			 = result[0]['game'];
				newsProri.food			 = result[0]['food'];	
				login.newsProri = newsProri;
				req.session.user = login;//保存用户session信息
				//res.send({code: 1, msg: ' * 登录成功', userinfo : user});
				res.render(
				'index', 
				{errMsg: ' * 登录成功',
					username:login.username,newsAgg:newsAgg,
					showList:showList});
				//console.log('登陆成功');
			}	
            else{
                var user = {'username':''};
                res.locals.status = "fail";
                console.log('* 用户名或密码错误');
                console.log(res.locals.status);
				//res.send({code: 0, msg: ' * 用户名或密码错误', userinfo : user});
                res.render('index', 
					{errMsg: ' * 用户名或密码错误',username:"",newsAgg:newsAgg,
					showList:showList});
            }
        }		
        res.end();
    });
});

module.exports = router;
