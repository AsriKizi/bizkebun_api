// auth.js
const jwt = require('jsonwebtoken');

const secretKey = 'my_kebun_secret_key'; // Replace with a secure secret key

function generateToken(user) {
  return jwt.sign(user, secretKey, { expiresIn: '1h' });
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
}

module.exports = { generateToken, verifyToken };