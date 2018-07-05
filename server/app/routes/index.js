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
};
