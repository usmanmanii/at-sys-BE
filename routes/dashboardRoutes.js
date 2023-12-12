const express = require('express');
const router = express.Router();

const dashboard = require('../controllers/dashboardController');
// const auth = require("../authMiddleware")
const auth = require("../middleware/jwtmiddleware")

router.get('/dashboard' , auth ,dashboard.getAlldashboardCounts);

module.exports = router;