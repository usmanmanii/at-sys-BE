const express = require("express");
const router = express.Router();
const universityController = require('../controllers/universityController')


router.post('/university', universityController.createUniversity);


router.get('/university', universityController.getdata)



router.get('/university/:id', universityController.getUniversitybyId);


router.put('/university/:id', universityController.updatedata)

router.delete('/university/:id',  universityController.deleteUniversityById)

module.exports = router;

