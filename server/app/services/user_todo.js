const jwt = require('jsonwebtoken');
const User = require('../models/users.js');
const Video = require('../models/video.js');
const util = require('../utiles/utils_enc.js');
const Commentdb = require('../models/comment.js');

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
  video_add: (req, res, next, token, titles, videourls, descriptions, keys) => {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        res.json({ status: '400', msg: 'token authentication failed' });
      } else {
        User.findOne({ email: decoded.email }, async (err1, docs) => {
          if (err1) {
            res.json({ status: '400', msg: 'db error' });
          } else if (docs == null) {
            res.json({ status: '400', msg: 'no such user found' });
          } else {
            const userData = await new Video({
              title: titles,
              videourl: videourls,
              description: descriptions,
              key: keys,
              user_id: docs._id,
            });
            Video.findOne({ videourl: videourls }, (err2, docs1) => {
              if (err2) {
                res.json({ status: 400, msg: 'db error' });
              } else if (docs1 == null) {
                userData.save().then(
                  () => {
                    res.json({ status: 200, msg: 'Success' });
                  },
                );
              } else {
                res.json({ status: 400, msg: 'url already exist' });
              }
            });
          }
        });
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
            Video.find({ user_id: docs._id }, { videourl: 1, _id: 0 }, (err1, docs1) => {
              if (err1) {
                res.json({ status: '400', msg: err1 });
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
  // defining the function for editing video details
  video_edit: async (req, res, next, token, videoIds, titles, videourls, descriptions, keys) => {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        res.json({ status: '400', msg: 'token authentication failed' });
      } else {
        User.findOne({ email: decoded.email }, async (err1, docs) => {
          if (err) {
            res.json({ status: '400', msg: 'db error' });
          } else if (docs == null) {
            res.json({ status: '400', msg: 'no such video found' });
          } else {
            Video.update({ video_id: videoIds },
              { $push: { title: titles, description: descriptions, key: keys } }, (err2, docs2) => {
                if (docs2) {
                  res.json({
                    status: '200',
                    msg: {
                      title: titles,
                      videourl: videourls,
                      description: descriptions,
                      key: keys,
                    },
                  });
                }
              });
          }
        });
      }
    });
  },
  // defining the function for deleting video details
  video_delete: async (req, res, next, token, videoIds) => {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        res.json({ status: '400', msg: 'token authentication failed' });
      } else {
        User.findOne({ email: decoded.email }, async (err1, docs) => {
          if (err1) {
            res.json({ status: '400', msg: 'db error' });
          } else if (docs == null) {
            res.json({ status: '400', msg: 'no such video found' });
          } else {
            Video.findOne({ _id: videoIds }, (err2, docss) => {
              if (err2) {
                res.json({ status: '400', msg: 'db error' });
              } else if (docss == null) {
                res.json({ status: '400', msg: 'no such video found' });
              } else {
                Video.deleteOne({ _id: videoIds }, (err3, docs2) => {
                  if (err3) {
                    res.json({ status: 'error', msg: 'db error' });
                  } else if (docs2 == null) {
                    res.json({ error: 'success', msg: 'cant delete' });
                  } else {
                    // console.log(docs2);
                    res.json({ status: 'success', msg: 'deleted' });
                  }
                });
              }
            });
          }
        });
      }
    });
  },
  // defining the function to list the details of a video
  video_player: async (req, res, next, token, videoIds) => {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        res.json({ status: '400', msg: 'token authentication failed' });
      } else {
        User.findOne({ email: decoded.email }, async (err1, docs) => {
          if (err1) {
            res.json({ status: '400', msg: 'db error1' });
          } else if (docs == null) {
            res.json({ status: '400', msg: 'no such user found' });
          } else {
            Video.findOne({ _id: videoIds }, async (err2, docss) => {
              if (err2) {
                res.json({ status: '400', msg: 'db error2' });
              } else if (docss == null) {
                res.json({ status: '400', msg: 'no such video found' });
              } else {
                res.json({ status: 'success', msg: docs });
              }
            });
          }
        });
      }
    });
  },
  keywordsearch: async (req, res, next, token, keyword) => {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        res.json({ status: '400', msg: 'token authentication failed' });
      } else {
        User.findOne({ email: decoded.email }, async (err1, docs) => {
          if (err1) {
            res.json({ status: '400', msg: 'db error' });
          } else if (docs == null) {
            res.json({ status: '400', msg: 'no such user found' });
          } else {
            Video.find({ key: keyword }, async (err2, docs1) => {
              if (docs1 == null) {
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
  comment: (req, res, next, token, comments, videoids, userids) => {
    const userData = new Commentdb({
      comment: comments,
      videoid: videoids,
      userid: userids,
    });
    // console.log(comments);
    User.findOne({ _id: userData.userids }, (err, docs) => {
      if (err) {
        res.json({ status: '400', msg: 'db error' });
      } else if (docs == null) {
        userData.save().then(() => {
          res.json({ status: '200', msg: 'Success' });
        });
      } else { res.json({ status: '400', msg: 'User exist' }); }
    });
  },
  commentlist: async (req, res, next, token, video) => {
    // console.log(video);
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
            // console.log(video);
            Commentdb.find({ _id: video }, (err1, docs1) => {
              if (err1) {
                res.json({ status: '400', msg: err1 });
              } else if (docs1 == null) {
                res.json({ status: '400', msg: 'No comments added by this user' });
              } else {
                res.json({ status: '200', msg: docs1 });
              }
            });
          }
        });
      }
    });
  },
  recommendation: async (req, res, next, token, videoIds) => {
    const arrays = [];
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        res.json({ status: '400', msg: 'token authentication failed' });
      } else {
        User.findOne({ email: decoded.email }, (err1, docs) => {
          if (err1) {
            res.json({ status: '400', msg: 'db error' });
          } else if (docs == null) {
            res.json({ status: '400', msg: 'no such user found' });
          } else {
            Video.findOne({ _id: videoIds }, (err2, docs1) => {
              if (err2) {
                res.json({ status: 400, msg: 'db error' });
              } else if (docs1 == null) {
                res.json({ status: 200, msg: 'vedio not found' });
              } else {
                arrays.push(docs1.key);
                // console.log('Dont', arrays.length);
                // callback(arrays);
                const matches = [];
                // console.log('Does', arrays);
                const arr = arrays[0];
                Video.find({ key: { $in: arr }, _id: { $ne: videoIds } },
                  { videourl: 1, _id: 1 }, (err3, docs2) => {
                    if (err3) {
                      res.json({ status: 400, msg: 'db error' });
                    } else if (docs2 == null) {
                      res.json({ status: 200, msg: 'No recommendations found' });
                    } else {
                      matches.push(docs2);
                      res.json(matches);
                    }
                  });
              }
            });
            // res.json({ status: '200', msg: matches })
          }
        });
      }
    });
  },
  // defining the function for listing  videos of particular users on mlab
  list: async (req, res, next) => {
    Video.find({ }, { videourl: 1, _id: 0 }, (err1, docs1) => {
      if (err1) {
        res.json({ status: '400', msg: err1 });
      } else if (docs1 == null) {
        res.json({ status: '400', msg: 'No videos added by this user' });
      } else {
        res.json({ status: '200', msg: docs1 });
      }
    });
  },
};
