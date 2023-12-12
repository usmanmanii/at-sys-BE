// const jwt = require("jsonwebtoken");

// function authenticateToken(req, res, next) {
//     // return res.send({
//     //     body: JSON.stringify(req.body),
//     //     params: JSON.stringify(req.params),
//     //     headers: JSON.stringify(req.headers)
//     // })
//     console.log("MIddleware Paload Body => ", JSON.stringify(req.body));
//     console.log("MIddleware Paload Params => ", JSON.stringify(req.params));
//     console.log("MIddleware Paload Headers => ", JSON.stringify(req.headers));
//   const token = req.headers.authorization;
//   // const password =req.body.password;
//   if (!token) return res.status(401).json({ message: "No token provided" });
//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err)
//       return res.status(403).json({ message: "Failed to authenticate token" });
//     req.user = decoded;
//     next();
//   });
// }


// module.exports = authenticateToken;
