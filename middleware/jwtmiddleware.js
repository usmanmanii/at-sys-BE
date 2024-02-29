const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }
    let token;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else {
      token = authHeader;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        // const userId = decodedToken.userId;
        const userId = decodedToken._id;

        if (req.body.userId && req.body.userId !== userId) {
          throw "Invalid user ID";
        } else {
          // added this line
          req.user = decodedToken;

          next();
        }
      }
    });
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

module.exports = authenticateToken;
