/**
 * Post Model
 */ 

var models = require('../models'),
    User = models.user
 
exports.add = function (name, loginName, password, email, callback) {
    var user = new User({
        name: name,
        loginName: loginName,
        password: password,
        email: email,
        avatar: utils.generateAvatarUrl(email)
    })

    user.save(user)
}

exports.get = function (loginName, index, size, callback) {
    User.find({ loginName: loginName }).limit(size).skip((index + 1) * size).exec(callback)
}

exports.getById = function (id, callback) {
    User.findById({ _id: id }, callback)
}

exports.login = function (loginName, password, callback) {
    User.findOne({ loginName: loginName, password: password }, callback)
}

exports.delete = function (id, callback) {
    User.remove({ _id: id }, callback)
}

exports.update = function (user, callback) {
    var conditions = { _id: user._id }

    delete user._id
    delete user.createdAt
    delete user.createdBy
    delete user.loginName

    user.updateAt = new Date()
    user.avatar = utils.generateAvatarUrl(user.email)

    User.update(conditions, user, callback)
}