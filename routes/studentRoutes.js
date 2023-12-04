const express = require("express");
const router = express.Router();
const studentController = require('../controllers/studentController');


router.post('/student', (req, res) => {
  studentController.createStudent(req, res);
});


router.get('/student', studentController.getAllStudents)


router.get('/student/:id', studentController.getStudentById)



router.put('/student/:id', studentController.updateStudentById)


router.delete('/student/:id', studentController.deleteStudentById)

module.exports = router;
