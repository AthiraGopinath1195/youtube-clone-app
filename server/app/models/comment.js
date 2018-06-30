//model/comment.js
const mongoose = require ('mongoose')

//defining schema
const commentSchema = mongoose.Schema(
  {
    comment: String,
    videoid: Object,
    userid: Object
  }
)

module.exports = mongoose.model('Comment',commentSchema)