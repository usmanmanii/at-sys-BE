const express = require("express");
const router = express.Router();
const studentController = require('../controllers/studentController');
const authenticateToken = require('../middleware/jwtmiddleware');
const admin = require('../middleware/onlyAdmin');


router.post('/student',  admin ,(req, res) => {
  studentController.createStudent(req, res);
});


router.get('/student', authenticateToken,studentController.getAllStudents)


router.get('/student/:id', authenticateToken,studentController.getStudentById)



router.put('/student/:id',  admin ,studentController.updateStudentById)


router.delete('/student/:id', admin ,studentController.deleteStudentById)

module.exports = router;
