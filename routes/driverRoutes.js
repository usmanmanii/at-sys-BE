const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverController");
const authenticateToken = require("../middleware/jwtmiddleware");
const admin = require('../middleware/onlyAdmin');

router.get("/get-cities", (req, res) => {
  driverController.getCities(req, res);
});

router.post("/publish-ride", authenticateToken, admin,(req, res) => {
  driverController.publishRide(req, res);
});

module.exports = router;
