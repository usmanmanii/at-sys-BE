const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

const secretKey = process.env.JWT_SECRET; 

// const authenticateToken = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized: No token provided' });
//   }

//   jwt.verify(token, secretKey, (err, user) => { 
//     if (err) {
//       return res.status(403).json({ message: 'Forbidden: Invalid token' });
//     }
//     req.user = user;
//     next();
//   });
// };

// module.exports = authenticateToken;


const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], secretKey, function (err, decode) {
      if (err) req.user = undefined;
      User.findOne({
          _id: decode.id
        })
        .exec((err, user) => {
          if (err) {
            res.status(500)
              .send({
                message: err
              });
          } else {
            req.user = user;
            next();
          }
        })
    });
  } else {
    req.user = undefined;
    next();
  }
};
module.exports = verifyToken;