const jwt = require('jsonwebtoken');
const User = require('./lib/models/User');

const token = jwt.sign({
  name: 'spot',
  age: 5,
  weight: '20 lbs'
}, 'secret', {
  expiresIn: '24h'
});


console.log(token);

const payload = jwt.verify(token, 'secret');
