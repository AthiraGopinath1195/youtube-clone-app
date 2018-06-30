
module.exports = {
  edit: async function (req, res, next) {
    try {
      console.log(req.body)
    }
    catch(err){
      console.log(err)
    }
  }
}