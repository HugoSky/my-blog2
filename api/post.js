var PostProxy = require('../proxy').Post,
	jsonTool = require('../common/jsonTool'),
	CommentProxy = require('../proxy').Comment,
    auth = require('../middlewares/auth'),
    appInfo = require('../settings').appInfo;

 
exports.add = function (req, res, next) {
	var post = req.body

	if(!post || !post.title || !post.content || !post.tags){
		return res.json(jsonTool.object('not entire post data'))
	}

	var tags = post.tag.split(';')

	tags = tags.map(function (tag) {
		return({
			tagName: tag
		})
	})

	var loginUser = auth.getLoginUser(req)

	PostProxy.add(loginUser._id, post.title, tags, post.content, function(err, user){
		return res.json(jsonTool.object(err, user))
	})
}
 
exports.get = function (req, res, next) {
	var title = req.query['title'],
    	index = req.query['index'],
    	size = req.query['size']

    if(!index || !size){
    	return res.json(jsonTool.object('Not entire pagination info!'))
    }

    PostProxy.total(title, function (err, count) {
    	if(err){
    		return res.json(jsonTool.object(err))
    	}
    	PostProxy.get(title, index, size, function (err_1, data) {
    		return res.json(jsonTool.data(err_1,data))
    	})
    })
}

exports.getPosts = function (req, res, next) {
	var type = req.query['type'],
	    hotPostNum = appInfo.hotPostNum

	if(!type){
    	return res.json(jsonTool.object('need a type!'))
	}

	PostProxy.getPosts(type, hotPostNum, function (err, data) {
		return res.json(jsonTool.data(err, data))
	})
}	

exports.getById = function (req, res, next) {
	var _id = req.query['id']

	if(!_id){
    	return res.json(jsonTool.object('need post _id!'))
	}

	PostProxy.getById(_id, function (err, post) {
		if(err){
			return res.json(jsonTool.object(err))
		}
		if(post){
			PostProxy.updatePv(post, function(err_1, cb){
				if(err_1){
					console.error('Error:', err);
				}

				if(cb.n < 1 && cb.ok != 1){
                    console.error('Error:', 'Post(Id:'+ _id + ')pv not be added successed!');
                }

                return res.json(jsonTool.object(err_1, post));
			})
		}else{
            return res.json(jsonTool.object('Not find Post.(PostId:' + _id + ')'));
		}
	})
}	

exports.delete = function (req, res, next) {
	var _id = req.query['id']

	if(!_id){
        res.json(jsonTool.object('No Post _id!'));
    }

    CommentProxy.deleteByPostId(_id, function (err, cb) { 
    	if(err){
            return res.json(jsonTool.object(err));
        }
        PostProxy.delete(_id, function (err_1) {
        	return res.json(jsonTool.object(err_1));
		})
    })
}

exports.update = function (req, res, next) {
	var post = req.body,
		loginUser = auth.getLoginUser(req)

	if(!post){
		return res.json(jsonTool.object('No post info!'));
	}

	var tags = post.tags.split(';')

	tags = tags.map(function(tag){
		return ({
			tagName: tag
		})
	})

	post.tags = tags

	PostProxy.update(loginUser._id, post, function(err, cb){
		return res.json(jsonTool.object(err, cb))
	})
}

exports.getTags = function (req, res, next) {
	PostProxy.getTags(function (err, tags) {
		return res.json(jsonTool.data(err, tags, -1))
	})
}

exports.getPostsByTag = function(req, res, next){
	var tag = req.params['tag'],
		index = req.query['index'],
		size = req.query['size']

	if(!index || !size){
        return res.json(jsonTool.object('Not entire pagination info!'))
    }

    if(!tag){
        return res.json(jsonTool.object('No tag!'))
    }

    PostProxy.getPostTotalByTag(tag, function(err,cb){
    	if(err){
    		return res.json(jsonTool.object(err))
    	}
    	PostProxy.getPostsByTag(tag, index, size, function(err_1, posts){
    		return res.json(jsonTool.data(err_1, posts, count))
    	}) 
    })
}


exports.newArticleList = function (req, res, next) {
	 console.log('newArticleList')

}

exports.articleList = function (req, res, next) {
	var page = req.query['page'],
	   	limit = req.query['limit'],
	   	category = req.query['category']

	PostProxy.getArticles(page, limit, category, function (err, data) {
		return res.json(jsonTool.data(err, data))
	})
}	