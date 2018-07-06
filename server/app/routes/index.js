// routes/index.js
const controller = require('../controllers/cntrlr.js');

module.exports = (app) => {
  // defining the route for user signup
  app.post('/api/signup', async (req, res, next) => {
    await controller.signup(req, res, next);
  });
  // end

  //  defining the route for user signup
  app.post('/api/signin', async (req, res, next) => {
    await controller.signin(req, res, next);
  });
  // end

  //  defining the route for adding video---
  app.post('/api/add', async (req, res, next) => {
    await controller.add(req, res, next);
  });
  // end

  //  defining the route for listing videos of pariticular users---
  app.post('/api/userlist', async (req, res, next) => {
    controller.user_list(req, res, next);
  });
  // end

  // defining the route for editing videos of particular user
  app.post('/api/edit', async (req, res, next) => {
    controller.video_edit(req, res, next);
  });
  // end

  // defining the route for deleting videos of a particular user
  app.post('/api/delete', async (req, res, next) => {
    controller.video_delete(req, res, next);
  });
  // end

  // defining the route for listin a video deatils
  app.post('/api/videoplayer', async (req, res, next) => {
    controller.video_player(req, res, next);
  });
  // end
  // defining the route for search a videos
  app.post('/api/search', async (req, res, next) => {
    controller.keywordsearch(req, res, next);
  });
  // end
  // defining the route for deleting videos of a particular user
  app.post('/api/comment', async (req, res, next) => {
    controller.comment(req, res, next);
  });
  // end

  // defining the route for comment listing of videos
  app.post('/api/commentlist', async (req, res, next) => {
    controller.commentlist(req, res, next);
  });
  // end
  // defining the route for deleting videos of a particular user
  app.post('/api/recommendation', async (req, res, next) => {
    controller.recommendation(req, res, next);
  });
  //  defining the route for listing all videos
  app.post('/api/list', async (req, res, next) => {
    controller.list(req, res, next);
  });
  // end
};
