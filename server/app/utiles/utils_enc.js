const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
  encrypt: (password) => {
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash;
  },
  decrypt: (password, password1) => {
    const decrypt = bcrypt.compareSync(password, password1);
    return decrypt;
  },
};
