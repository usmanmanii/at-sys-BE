const express = require('express');
const router = express.Router();

const instructorController = require('../controllers/instructorController');
const authenticateToken = require('../middleware/jwtmiddleware');
const admin = require('../middleware/onlyAdmin');


router.post('/instructors', admin, instructorController.createInstructor);

router.get('/instructors', authenticateToken, instructorController.getAllInstructors);

router.get('/instructors/:id', authenticateToken, instructorController.getInstructorById);

router.put('/instructors/:id', admin, instructorController.updateInstructorById);

router.delete('/instructors/:id', admin, instructorController.deleteInstructorById);

module.exports = router;
