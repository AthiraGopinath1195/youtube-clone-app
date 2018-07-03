// routes/index.js
const controller = require('../controllers/cntrlr.js');

module.exports = function application(app) {
//  defining the route for user signup---
app.post('/api/signup', async function(req, res,next){
   controller.signup(req,res,next)
 }),
 //---defining the route for user signup---
 app.post('/api/signin',async function(req,res,next){
   controller.signin(req,res,next)
 }),
 //---defining the route for adding video---
 app.post('/api/add',async function(req,res,next){
   controller.add(req, res, next)
   
 }),
 //---defining the route for listing videos of pariticular users---
 app.post('/api/userlist', async function(req, res, next){
   controller.user_list(req, res, next)
 })
 app.post('/api/edit',async function(req,res,next){
  //console.log("post received")
 })

 app.get('/api/search',async function(req,res,next){
   controller.serach(req,res,next)
 })
}