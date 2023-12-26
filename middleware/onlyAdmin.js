const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const onlyAdmin = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    try {
        if (!token) {
            return res.status(401).send("Access denied. No token provided.");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded && decoded.position === 'Admin') {
            req.user = decoded;
            next();
        } else {
            res.status(403).send("Access denied. User does not have the required role.");
        }
    } catch (ex) {
        res.status(400).send("Invalid token.");
    }
};

module.exports = onlyAdmin;
