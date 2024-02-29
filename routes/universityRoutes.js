const express = require("express");
const router = express.Router();
const universityController = require('../controllers/universityController')
const authenticateToken = require('../middleware/jwtmiddleware');
const admin = require('../middleware/onlyAdmin');


router.post('/university',admin,universityController.createUniversity);


router.get('/university', authenticateToken,universityController.getdata)



router.get('/university/:id', authenticateToken, universityController.getUniversitybyId);


router.put('/university/:id', admin,universityController.updatedata)

router.delete('/university/:id',admin, universityController.deleteUniversityById)

module.exports = router;

