var express = require('express');
var router = express.Router();
var News = require('../models/user.js')

/* GET home page. */
router.get('/',function(req,res){
	var username;
	if (req.session.user !=  null)
		username = req.session.user.username;//用户session信息
	else username = "";
	console.log("username: " + username);
	res.render
	(
		'personalSuccess', 
		{
			errMsg: '',
			username:username
		}
	);
});

module.exports = router;
