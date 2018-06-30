//model/users.js
const mongoose = require ('mongoose')

//defining schema
const userSchema = mongoose.Schema(
  {
    username: String,
    email: String,
    password: String
  }
)

module.exports = mongoose.model('User',userSchema)