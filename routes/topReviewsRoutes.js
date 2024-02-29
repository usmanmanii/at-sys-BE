const express = require("express");
const router = express.Router();
const topReviewsController = require("../controllers/topReviewsController");
const authenticateToken = require('../middleware/jwtmiddleware');
const admin = require('../middleware/onlyAdmin');
router.post("/add", admin,(req, res) => {
  topReviewsController.addReview(req, res);
});

module.exports = router;
