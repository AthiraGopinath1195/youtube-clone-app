// routes/index.js
const controller = require('../controllers/cntrlr.js')

module.exports = function(app) {
 //---defining the route for user signup---
 app.post('/api/signup', async function(req, res,next) {
   controller.signup(req,res,next)
 }),
 app.post('/api/sigin',async function(req,res){

 })
 app.post('/api/edit',async function(req,res,next){
   
 })
}