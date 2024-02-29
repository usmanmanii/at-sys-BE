const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authenticateToken = require('../middleware/jwtmiddleware');
const admin = require('../middleware/onlyAdmin');



router.get('/dashboard', authenticateToken, admin ,dashboardController.getAlldashboardCounts);

module.exports = router;
