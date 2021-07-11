const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.encryptPassword = (password) => {
    return bcrypt.hashSync(password, saltRounds);
};

exports.validatePassword = (password, encryptedPassword) => {
    return bcrypt.compareSync(password, encryptedPassword);
};
