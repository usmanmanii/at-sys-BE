const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const authenticateToken = require('../middleware/jwtmiddleware');
const admin = require('../middleware/onlyAdmin');


router.post('/class', authenticateToken, admin, classController.createClass);

router.get('/class', authenticateToken, classController.getAllClasses);

router.get('/class/:id', authenticateToken, classController.getClassById);

router.put('/class/:id', authenticateToken, admin, classController.updateClassById);

router.delete('/class/:id', authenticateToken, admin, classController.deleteClassById);


module.exports = router;
