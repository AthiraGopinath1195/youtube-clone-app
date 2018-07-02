

const jwt = require('jsonwebtoken')

const service = require('../services/user_todo.js')
const util = require('../utiles/utils_enc.js')


module.exports = {
  //---defining the function for signup---
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
  //---defining the function for adding signin---
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
  //---defining the function for adding video---
  add: async function(req, res, next){
    try{
      var token = await req.headers['token']
      var title = await req.body.title
      var videourl = await req.body.videourl
      var description = await req.body.description
      var key = await req.body.key
      if(!token)
      {
        res.json({'status':'400','msg':'token not present'})
      }
      else{
        service.video_add(req, res, next, token, title, videourl, description, key)
      }
      

    }
    catch (err){
      res.send(err)
    }
  }
 } 