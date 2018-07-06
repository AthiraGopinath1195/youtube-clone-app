// controllers/cntrlr.js

const service = require('../services/user_todo.js');
const util = require('../utiles/utils_enc.js');


module.exports = {
  // ---defining the function for signup---
  signup: async (req, res) => {
    try {
      // console.log(req.body)
      const username = await req.body.username;
      const email = await req.body.email;
      const password = await req.body.password;
      const hash = util.encrypt(password);
      service.user_insert(req, res, username, email, hash);
    } catch (err) {
      res.send(err);
    }
  },
  // ---defining the function for adding signin---
  signin: async (req, res, next) => {
    try {
      // console.log(req.body)
      const email = await req.body.email;
      const password = await req.body.password;
      service.user_signin(req, res, next, email, password);
    } catch (err) {
      res.send(err);
    }
  },
  // ---defining the function for adding video---
  add: async (req, res, next) => {
    try {
      const token = await req.headers.token;
      const title = await req.body.title;
      const videourl = await req.body.videourl;
      const description = await req.body.description;
      const key = await req.body.key;
      if (!token) {
        res.status(400).json({
          msg: 'token not present',
        });
      } else {
        service.video_add(req, res, next, token, title, videourl, description, key);
      }
    } catch (err) {
      res.send(err);
    }
  },
  // ---defining the function for listing videos of particular user---
  user_list: async (req, res, next) => {
    try {
      const token = await req.headers.token;
      if (!token) {
        res.status(400).json({
          msg: 'token not present',
        });
      } else {
        service.user_list(req, res, next, token);
      }
    } catch (err) {
      res.send(err);
    }
  },
  // ---defining the function to edit the videos added
  video_edit: async (req, res, next) => {
    try {
      const token = await req.headers.token;
      const videoId = await req.body.video_id;
      const title = await req.body.title;
      const videourl = await req.body.videourl;
      const description = await req.body.description;
      const key = await req.body.key;
      if (!token) {
        res.status(400).json({
          msg: 'token not present',
        });
      } else {
        service.video_edit(req, res, next, token, videoId, title, videourl, description, key);
      }
    } catch (err) {
      res.send(err);
    }
  },
  // ---defining the function to delete the videos added
  video_delete: async (req, res, next) => {
    try {
      const token = await req.headers.token;
      const videoId = await req.body.video_id;
      // console.log(videoId);
      if (!token) {
        res.status(400).json({
          msg: 'token not present',
        });
      } else {
        service.video_delete(req, res, next, token, videoId);
      }
    } catch (err) {
      res.send(err);
    }
  },
  // ---defining the function to list a video details
  video_player: async (req, res, next) => {
    try {
      const token = await req.headers.token;
      const videoId = await req.body.video_id;
      if (!token) {
        res.status(400).json({
          msg: 'token not present',
        });
      } else {
        service.video_player(req, res, next, token, videoId);
      }
    } catch (err) {
      res.send(err);
    }
  },
  keywordsearch: async (req, res, next) => {
    try {
      const token = await req.headers.token;
      const keyword = await req.body.keyword;
      if (!token) {
        res.status(400).json({
          msg: 'token not present',
        });
      } else {
        service.keywordsearch(req, res, next, token, keyword);
      }
    } catch (err) {
      res.send(err);
    }
  },
  comment: async (req, res, next) => {
    try {
      const token = await req.headers.token;
      const comments = await req.body.comments;
      const videoids = await req.body.videoids;
      const userids = await req.body.userids;
      if (!token) {
        res.status(400).json({
          msg: 'token not present',
        });
      } else {
        // console.log(comments);
        service.comment(req, res, next, token, comments, videoids, userids);
      }
    } catch (err) {
      res.send(err);
    }
  },
};
