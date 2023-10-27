const jwt = require('jsonwebtoken');
const config = require('../config'); 

const secretKey = config.jwtSecretKey;

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    req.user = user; 
    next();
  });
}

module.exports = {
  authenticateToken,
};
