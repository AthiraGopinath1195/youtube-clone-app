

const jwt = require('jsonwebtoken')

const service = require('../services/user_todo.js')
const util = require('../utiles/utils_enc.js')


module.exports = {

  signup: async function (req, res,next) {
    try {
      console.log(req.body)
      var username = await req.body.username
      var email = await req.body.email
      var password = await req.body.password
      var hash = util.encrypt(password)
      service.user_insert(req,res,username,email,hash)
    }
    catch (err){
      res.send(err)
    }
  },

  signin: async function(req, res, next){
    try{
      console.log(req.body)
      var email = await req.body.email;
      var password =await req.body.password;
      service.user_signin(req, res, next, email, password)
    }catch (err) {
      res.send(err)
    }
  },
 } 