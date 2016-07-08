var express = require('express');
var router = express.Router();
var appInfo = require('../settings').appInfo;

router.get('/', function (req, res, next) {
	// res.render('index',{
	// 	title: appInfo.appName,
 //        shortDes: appInfo.shortDescription,
 //        hash: appInfo.buildDev ? '' : '-' + appInfo.hash
	// })
	console.log('/')
	// res.sendFile(path.join(__dirname,'index.html'))
})

module.exports = router