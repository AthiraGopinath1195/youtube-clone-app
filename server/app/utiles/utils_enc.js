const bcrypt = require ('bcrypt')
const saltRounds = 10
module.exports = {
 encrypt :function(password){
  return (bcrypt.hashSync(password,saltRounds))
 },
 decrypt : function(password,password1){
  return (bcrypt.compareSync(password, password1))
}

}