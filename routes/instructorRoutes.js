const express = require('express');
const router = express.Router();

const instructorController = require('../controllers/instructorController');


router.get('/instructors', instructorController.getAllInstructors);

router.post('/instructors', instructorController.createInstructor);

router.get('/instructors/:id', instructorController.getInstructorById);

router.put('/instructors/:id', instructorController.updateInstructorById);

router.delete('/instructors/:id', instructorController.deleteInstructorById);

module.exports = router;
