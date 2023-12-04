const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');


router.post('/room', roomController.createRoom)


router.get('/room', roomController.getAllRooms)


router.get('/room/:id', roomController.getRoomById);



router.put('/room/:id', roomController.updateRoomById)

router.delete('/room/:id', roomController.deleteRoomById);

module.exports = router;
