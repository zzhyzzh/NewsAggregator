/**
 * Created by Zihan Zhao
 */
var express = require('express');
var User = require("../models/user.js");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { errMsg: '',username:user.username});
    if (req.session.user !=  null){
        var user = req.session.user;
        console.log(user.username);
		res.render('index', { errMsg: ' * 登录成功',username:user.username});
    }
    else {
        user = {'username':''};
        console.log("没有session");
		res.render('index', { errMsg: ' * 用户未登陆',username:""});
    }
    res.end();
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
            //res.locals.status = "fail";
            var user = {'username':''};
            //res.render('index', {errMsg: err });			
            res.send({code: 0, msg: err, userinfo : user});
            return;
        }
		console.log(result);
        if(result == ''){
            var user = {'username':''};
            res.locals.status = "fail";
            console.log('* 用户名或密码错误');
            res.send({code: 0, msg: ' * 用户名或密码错误', userinfo : user});
			//res.redirect('/');
        }
        else{
            if(result[0]['password'] == password){
				//判断用户状态				
				var user = {'username':username};					
				req.session.user = user;//保存用户session信息
				res.send({code:1, msg:'登录成功', userinfo : user});
				//res.render('index', {errMsg: ' * 登录成功',username:user.username });
				//res.redirect('/');
				console.log('登陆成功');
			}	
            else{
                var user = {'username':''};
                res.locals.status = "fail";
                console.log('* 用户名或密码错误');
                console.log(res.locals.status);
				res.send({code: 0, msg: ' * 用户名或密码错误', userinfo : user});
                //res.render('index', {errMsg: ' * 用户名或密码错误' });
				//res.redirect('/');
            }
        }
        res.end();
    });
});


module.exports = router;
