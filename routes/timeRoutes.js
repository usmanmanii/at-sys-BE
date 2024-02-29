const express = require('express');
const router = express.Router();
const timeSlotController = require('../controllers/timeController');
const authenticateToken = require('../middleware/jwtmiddleware');
const admin = require('../middleware/onlyAdmin');


router.post('/time-slots',  admin ,timeSlotController.createTimeSlot)


router.get('/time-slots', authenticateToken , timeSlotController.getAllTimeSlots)


router.get('/time-slots/:id',authenticateToken, timeSlotController.getTimeSlotById)


router.put('/time-slots/:id', admin , timeSlotController.updateTimeSlotById)


router.delete('/time-slots/:id', admin , timeSlotController.deleteTimeSlotById)

module.exports = router;
