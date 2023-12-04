const express = require('express');
const router = express.Router();
const timeSlotController = require('../controllers/timeController');


router.post('/time-slots', timeSlotController.createTimeSlot)


router.get('/time-slots', timeSlotController.getAllTimeSlots)


router.get('/time-slots/:id', timeSlotController.getTimeSlotById)


router.put('/time-slots/:id', timeSlotController.updateTimeSlotById)


router.delete('/time-slots/:id', timeSlotController.deleteTimeSlotById)

module.exports = router;
