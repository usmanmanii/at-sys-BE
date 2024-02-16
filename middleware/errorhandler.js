const errorhandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  console.log(err)
  return res.status(status).json({ message });
};

module.exports = errorhandler;

