
const user = require('../models/users.js')
const video = require('../models/video.js')
const util = require('../utiles/utils_enc.js')
const jwt = require('jsonwebtoken')

module.exports = {

  //---defining the function for adding users to mlab---
  user_insert: function(req, res, username,email,hash){
    var userData = new user({
      username: username,
      email: email,
      password: hash
    })
    user.findOne({email:userData.email},function(err,docs){
      if(err){
        res.json({"status":"400","msg":"db error"})
      } 
      else if(docs == null){
        userData.save().then(
          item => {
            res.json({"status":"200","msg":"Success"})
          }
        )
      
      }else
      {
        res.json({"status":"400","msg":"User exist"})
      }
      
    })
  },
    //---defining the function for signup by fetching values from  mlab---
    user_signin:function(req,res,next,email,password){
    
      user.findOne({email:email},function (err,docs){
      if (err){
        res.json({"status":"error","msg":"db_error_found"})
      } else if (docs==null){
        res.json({"status":"error","msg":"no_user_found"})
      } else{
        var decrypt = util.decrypt(password,docs.password)
        if (decrypt){
          const JWTtoken = jwt.sign({
            email: email
          },
          'secret',
          {
            expiresIn: '2h'
          })
          
          res.json({"status":"success","msg":JWTtoken})
          
        } else {
          res.json({"status":"error","msg":"password not matching"})
        }
      }
    })
  },
  //---defining the function for adding video on mlab---
    video_add:async function(req, res, next, token, title, videourl, description, key){

      jwt.verify(token,'secret',function(err,decoded){
        if(err)
        {
            res.json({'status':'400','msg':'token authentication failed'})
        }
        else
        {
            user.findOne({email:decoded.email},async function(err,docs){
                if(err)
                {
                    res.json({"status":"400","msg":"db error"})
                }
                else if(docs==null){
                    res.json({'status':'400','msg':'no such user found'})
                }
                else
                {
                    var userData = await new video({
                      title : title,
                      videourl : videourl,
                      description : description,
                      key : key,
                      user_id : docs._id
                    })
                    video.findOne({videourl:videourl},function(err,docs1){
                      if(err)
                      {
                        res.json({"status":"400","msg":"db error"})
                      }
                      else if(docs1==null)
                      {
                        userData.save().then(
                          item => {
                            res.json({"status":"200","msg":"Success"})
                          }
                      )
                      }
                      else
                      {
                        res.json({"status":"400","msg":"url already exist"})
                      }
                    })
                    
                }
            })
        }
    })
  },
  //---defining the function for listing  videos of particular users on mlab---
  user_list:async function(req, res, next, token){

    jwt.verify(token,'secret',function(err,decoded){
      if(err)
      {
          res.json({'status':'400','msg':'token authentication failed'})
      }
      else
      {
          user.findOne({email:decoded.email},async function(err,docs){
              if(err)
              {
                  res.json({"status":"400","msg":"db error"})
              }
              else if(docs==null){
                  res.json({'status':'400','msg':'no such user found'})
              }
              else
              {
                  video.find({user_id:docs._id},{videourl:1,_id:0},function(err,docs1){
                    if(err)
                    {
                      res.json({"status":"400","msg":"db error"})
                    }
                    else if(docs1==null)
                    {
                      res.json({"status":"400","msg":"No videos added by this user"})
                    }
                    else
                    {
                      var urls = docs1
                      res.json({"status":"200","msg":urls})
                    }
                  })
                  
              }
          })
      }
  })

  }
}