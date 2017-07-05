var express = require('express');
var router = express.Router();
var request = require("request");
var User = require('../models/user.js')
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

/* GET home page. */
router.get('/',function(req,res){
	var newsid = "i" + req.query.newsid;
	var year = req.query.year;
	var date = req.query.date;
	var catagory = req.query.catagory;
	var pic = req.query.pic;
	var comment = req.query.comment;
	var author = req.query.author;
	var url = "http://m.toutiao.com/" + newsid + "/info/";
	var news;
	v = request(
		{url: url, json: true}, 
		function (error, response, body)
		{
			if (!error && response.statusCode === 200) 
			{
				news = body;
			}
			var username;
			if (req.session.user !=  null)
			{				
				username = req.session.user.username;//用户session信息
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
				var user = new User({username : username});
				user.userInfo(function(err,result){
					if(err)		
						return;
					console.log(result);
					newsProri.society		 = result[0]['society'];
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
					switch(catagory)
					{
					case "hot":
						break;
					case "society":
						newsProri.society++;
						break;
					case "sport":
						newsProri.world++;
						break;			
					case "entertainment":
						newsProri.entertainment++;
						break;				
					case "world":
						newsProri.technology++;
						break;				
					case "technology":
						newsProri.sport++;
						break;				
					case "car":
						newsProri.car++;
						break;				
					case "finance":
						newsProri.finance++;
						break;				
					case "funny":
						newsProri.funny++;
						break;				
					case "military":
						newsProri.military++;
						break;				
					case "fashion":
						newsProri.fashion++;
						break;					
					case "discovery":
						newsProri.discovery++;
						break;				
					case "regimen":
						newsProri.regimen++;
						break;					
					case "history":
						newsProri.history++;
						break;					
					case "travel":
						newsProri.travel++;
						break;					
					case "game":
						newsProri.game++;
						break;				
					case "food":
						newsProri.food++;
						break;	
					}	
				});
				user.updateLike(newsProri, function(err,result){
				});
				switch(catagory)
				{
				case "hot":
					catagory = "热点";
					break;
				case "society":
					catagory = "社会";
					break;
				case "sport":
					catagory = "体育";
					break;			
				case "entertainment":
					catagory = "娱乐";
					break;				
				case "world":
					catagory = "国际";
					break;				
				case "technology":
					catagory = "科技";
					break;				
				case "car":
					catagory = "汽车";
					break;				
				case "finance":
					catagory = "财经";
					break;				
				case "funny":
					catagory = "搞笑";
					break;				
				case "military":
					catagory = "军事";
					break;				
				case "fashion":
					catagory = "时尚";
					break;					
				case "discovery":
					catagory = "探索";
					break;				
				case "regimen":
					catagory = "养生";
					break;					
				case "history":
					catagory = "历史";
					break;					
				case "travel":
					catagory = "旅行";
					break;					
				case "game":
					catagory = "游戏";
					break;				
				case "food":
					catagory = "美食";
					break;	
				}			
			}
			else username = "";
			console.log("username: " + username);
			console.log("catagory" + catagory);
			res.render
			(
				'post', 
				{
					errMsg: '',
					username:username,
					newsAgg:newsAgg,
					news:news,
					year:year,
					date:date,
					catagory:catagory,
					pic:pic,
					comment:comment,
					author:author
				}
			);
		}
		
	);
	// var i =0;
	// while(newsList[0]=="")
	// {	
		
		// console.log("waiting...:" + i);
		// i++;
	// }


});

module.exports = router;
