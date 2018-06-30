const bcrypt = require ('bcrypt')
const saltRounds = 10
module.exports = {
 encrypt :function(password){
  return (bcrypt.hashSync(password,saltRounds))
 }
}