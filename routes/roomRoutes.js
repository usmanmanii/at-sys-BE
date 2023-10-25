const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');


router.post('/room', roomController.createRoom)


router.get('/room', roomController.getAllRooms)


router.get('/room/:id', roomController.getRoomById);



router.put('/rooms/:id', roomController.updateRoomById)

router.delete('/rooms/:id', roomController.deleteRoomById);

module.exports = router;
