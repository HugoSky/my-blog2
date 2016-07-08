/**
 * Comment Model
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var CommentSchema = new Schema({
    email: { type: String },
    content: { type: String },
    goodStars: { type: Number },
    badStars: { type: Number },
    createdAt: { type: Date, default: Date.now },
    postId: { type: Schema.ObjectId, ref: 'Post' }
})
 
//建索引  提高查询速度
CommentSchema.index({email: 1})

mongoose.model('Comment',CommentSchema)