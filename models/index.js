var mongoose = require('mongoose'),
	settings = require('../settings');

mongoose.connect(settings.dbInfo.address, {
	server: {poolSize: settings.dbInfo.poolSize}
},function(err){
	if(err){
        console.error('connect to %s error: ', settings.dbInfo.address, err.message);
        process.exit(1);
    }
})

require('./user')
require('./post')
require('./comment')

exports.User = mongoose.model('User')
exports.Comment = mongoose.model('Comment')
exports.Post = mongoose.model('Post')