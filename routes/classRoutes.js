const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');


router.post('/class', classController.createClass);


router.get('/class', classController.getAllClasses);

router.get('/class/:id', classController.getClassById);


router.put('/class/:id', classController.updateClassById);


router.delete('/class/:id', classController.deleteClassById);

module.exports = router;
