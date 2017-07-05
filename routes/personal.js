var express = require('express');
var router = express.Router();
var User = require('../models/user.js')

/* GET home page. */
router.get('/',function(req,res){
	var username;
	if (req.session.user !=  null)
		username = req.session.user.username;//用户session信息
	else username = "";
	console.log("username: " + username);
	res.render
	(
		'personal', 
		{
			errMsg: '',
			username:username
		}
	);
});

router.post("/",function(req, res) {
    //获取form表单提交的登录数据
	var user = new User({
		username : req.session.user.username,
		password : req.session.user.password
	});
    var checklist = req.body.check;
    console.log("兴趣设置"+ checklist[0]);
	user.setLike(checklist, function(err,result)
	{
        if(err)
		{
            var user = {'username':''};
            res.render('personal', {errMsg: err, username:user.username});			
            return;
        }
        else
		{
			res.redirect('/personalSuccess');
		}
       res.end();
    });
});

module.exports = router;
