
const user = require('../models/users.js')

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
 }

}