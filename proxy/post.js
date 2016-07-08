/**
 * Post Proxy
 */

var models = require('../models'),
    Post = models.Post,
    sortTags = require('../common/common')

exports.add = function (userId, title, tags, content, category, callback) {
    var post = new Post({
          title: title,
          tags: tags,
          content: content,
          pv: 0,
          commentNum: 0,
          createdBy: userId,
          updatedBy: userId,
          category: category
    })

    Post.save(callback)
}
 
exports.get = function (title, index, size, callback) {
    Post.find(title ? {title: title} :null).limit(size).skip((index-1) * size)
    .sort({updateAt: -1}).populate('createdBy').populate('updatedBy').exec(callback)
}

exports.total = function (title, callback) {
    Post.count(title ? {title: title} : null, callback)
}

exports.getPosts = function (type, size, callback) {
    switch (type) {
        case 'byViewNum':
            Post.find().limit(size).sort({pv: -1}).exec(callback)
            break
        case 'byCommentNum':
            Post.find().limit(size).sort({commentNum: -1}).exec(callback)
            break
        default:
            var total = -1
            Post.count(function(err, count){
                if(err){
                    return callback(err)
                }
                total = count

                var randomSkip = Math.ceil(Math.random() * total)
                Post.find().limit(size).skip(randomSkip).exec(callback)
            })
    }
}

exports.getById = function (id, callback) {
    Post.find({_id: id}, callback)
}

exports.delete = function (id,callback) {
    Post.remove({_id: id}, callback)
}

exports.update = function (userId, post, callback) {
    var conditions = {_id: post._id}
    delete post._id
    delete post.createdAt
    delete post.createBy

    post.updatedBy = userId
    post.updatedAt = new Date()

    var update = post
    Post.update(conditions, update, callback)
}

exports.getTags = function (callback) {
    var tags = []

    Post.find(null).sort({updatedAt: -1}).exec(function (err, posts) {
        if(err){
            return callback(err)
        }

        posts.forEach(function (post) {
            if(post.tags && post.tags.length > 0){
                tags = sortTags(tags, post.tags)
            }
        })

        return callback(null, tags)
    })
}

exports.getPostsByTag = function (tag, callback) {
    Post.find({tags: {$elemMatch: {tagName: tag}}})
    .sort({updatedAt: -1}).exec(callback)
}

exports.getPostTotalByTag = function (tag, callback) {
    Post.count({tags: {$elemMatch: {tagName: tag}}}).exec(callback)
}

exports.updatePv = function (post, callback) {
    var conditions = {_id: post._id}
    delete post._id
    delete post.content
    delete post.createdAt
    delete post.createdBy
    delete post.updatedAt
    delete post.updatedBy
    delete post.tags
    delete post.commentNum

    post.pv += 1

    Post.update(conditions, post, callback)
}

exports.addCommentNum = function (postId, num, callback) {
    this.getById(postId, function(err, post){
        if(err){
            return callback(err)
        }

        if(post){
            var conditions = { _id: postId }

            delete post._id
            delete post.content
            delete post.createdAt
            delete post.createdBy
            delete post.updatedAt
            delete post.updatedBy
            delete post.tags
            delete post.pv

            post.commentNum += num

            Post.update(conditions, post, callback)
        }else{
            return callback('Not find Post by PostId.(' + postId + ')')
        }
    }) 
     
}


exports.getArticles = function (page, limit, category, callback) {
    if(category === ''){
        Post.find().skip((page-1)*limit).limit(limit).sort({time: -1}).exec(callback)
    }else{
        Post.find({category: category}).skip(page*limit).limit(limit).sort({time: -1}).exec(callback)
    }
}
