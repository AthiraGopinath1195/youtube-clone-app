
const user = require('../models/users.js')
const util = require('../utiles/utils_enc.js')
const jwt = require('jsonwebtoken')

module.exports = {
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
 }

}