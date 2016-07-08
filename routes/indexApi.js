var express = require('express');
var router = express.Router();

var auth = require('../middlewares/auth');

var User = require('../api/user');
var Post = require('../api/post');
var Comment = require('../api/comment');

//test
// router.get('/newArticleList',Post.newArticleList)
router.get('/article/list',Post.articleList)

// Post 
router.get('/posts',Post.get)
router.get('/posts/getPosts', Post.getPosts);
router.get('/posts/tags', Post.getTags);
router.get('/posts/tags/:tag', Post.getPostsByTag);
router.post('/posts', auth.loginRequired, Post.add);
router.get('/posts/:id', Post.getById);
router.put('/posts/:id', auth.loginRequired, Post.update);
router.delete('/posts/:id', auth.loginRequired, Post.delete);

// Comment
router.get('/comments/:postId', Comment.get);
router.post('/comments/:postId', Comment.add);

// Login
router.post('/login', User.login);

module.exports = router;

//可以在多个文件中写多个router 对应将app拆分成mini-apps

//主文件中也可以这样写
//app.use('/calendar', router);

/*
	router的方法 可以有多个callback
	多个callback会依次执行，起到中间件的作用，除非其中一个之中调用next()，
	会忽略掉后边的callback
	1. router.all(path, [callback...])
	2. router.METHOD(path, [callback...])
	3. router.param([name.], function(req, res, next, id){})
		匹配url中的 '/:name'
		只有一个callback，但可以有多个name，callback中的next被调用是执行的
		是下一个name的callback
		在调用最后一个name的callback时，调用next就会调用下一个中间件
		也可以这样用：
		router.param(function(param, option) {
		  return function (req, res, next, val) {
		    if (val == option) {
		      next();
		    }
		    else {
		      res.sendStatus(403);
		    }
		  }
		});

		 调用上边定义好的		
		 router.param('id', 1337);
	4. router.route
		匹配路由，之后可以使用链式调用来匹配get，post等请求
		router.route('/users/:user_id').all().get().post()
	5. router.use
		和app.use()很像
*/