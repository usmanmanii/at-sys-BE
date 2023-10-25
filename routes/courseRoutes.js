const express = require('express');
const router = express.Router();

const courseController = require('../controllers/courseController.js');

router.post('/courses', courseController.createCourse);

router.get('/courses', courseController.getAllCourses);

router.get('/courses/:id', courseController.getCourseById);

router.put('/courses/:id', courseController.updateCourseById);

router.delete('/courses/:id', courseController.deleteCourseById);

module.exports = router;
