const jwt = require('jsonwebtoken');
const User = require('../models/users.js');
const video = require('../models/video.js');
const util = require('../utiles/utils_enc.js');


module.exports = {

  // defining the function for adding users to mlab
  user_insert: (req, res, usernames, emails, hash) => {
    const userData = new User({
      username: usernames,
      email: emails,
      password: hash,
    });

    User.findOne({ email: userData.email }, (err, docs) => {
      if (err) {
        res.json({ status: '400', msg: 'db error' });
      } else if (docs == null) {
        userData.save().then(() => { res.json({ status: '200', msg: 'Success' }); });
      } else { res.json({ status: '400', msg: 'User exist' }); }
    });
  },
  // defining the function for signup by fetching values from  mlab---
  user_signin: (req, res, next, emails, password) => {
    User.findOne({ email: emails }, (err, docs) => {
      if (err) {
        res.json({ status: '400', msg: 'db_error_found' });
      } else if (docs == null) {
        res.json({ status: 400, msg: 'no_user_found' });
      } else {
        const decrypt = util.decrypt(password, docs.password);
        if (decrypt) {
          const JWTtoken = jwt.sign({
            email: emails,
          },
          'secret',
          {
            expiresIn: '2h',
          });
          res.json({ status: '200', msg: JWTtoken });
        } else {
          res.json({ status: '400', msg: 'password not matching' });
        }
      }
    });
  },
  // defining the function for adding video on mlab---
    video_add: (req, res, next, token, title, videourl, description, key) => {
      jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
          res.json({ status: '400', msg: 'token authentication failed' });
        } else {
            user.findOne({ email: decoded.email }, async (err, docs) => {
                if (err) {
                  res.json({ status: '400', msg: 'db error' });
                } else if (docs == null) { 
                  res.json({ status: '400', msg: 'no such user found' });                }
                } else {
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
                }
            })
        }
    });
  },
  // defining the function for listing  videos of particular users on mlab
  user_list: async (req, res, next, token) => {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        res.json({ status: 400, msg: 'token authentication failed' });
      } else {
        User.findOne({ email: decoded.email }, async (errs, docs) => {
          if (errs) {
            res.json({ status: '400', msg: 'db error' });
          } else if (docs == null) {
            res.json({ status: '400', msg: 'no such user found' });
          } else {
            video.find({ user_id: docs._id }, { videourl: 1, _id: 0 }, (err1, docs1) => {
              if (err1) {
                res.json({ status: '400', msg: 'db error' });
              } else if (docs1 == null) {
                res.json({ status: '400', msg: 'No videos added by this user' });
              } else {
                res.json({ status: '200', msg: docs1 });
              }
            });
          }
        });
      }
    });
  },
};