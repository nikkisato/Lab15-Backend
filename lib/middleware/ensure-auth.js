const User = require('../models/User');

module.exports = (req, res, next) => {
  const token = req.cookie.session;

  User
    .findByToken(token)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
};
