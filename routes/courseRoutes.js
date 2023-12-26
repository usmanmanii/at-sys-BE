const express = require('express');
const router = express.Router();

const courseController = require('../controllers/courseController.js');
const authenticateToken = require('../middleware/jwtmiddleware');
const admin = require('../middleware/onlyAdmin');


router.post('/courses', admin, courseController.createCourse);

router.get('/courses', authenticateToken, courseController.getAllCourses);

router.get('/courses/:id', authenticateToken, courseController.getCourseById);

router.put('/courses/:id', admin, courseController.updateCourseById);

router.delete('/courses/:id', admin, courseController.deleteCourseById);

module.exports = router;
