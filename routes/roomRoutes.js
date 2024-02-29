const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const authenticateToken = require('../middleware/jwtmiddleware');
const admin = require('../middleware/onlyAdmin');


router.post('/room', admin ,roomController.createRoom)


router.get('/room', authenticateToken,roomController.getAllRooms)


router.get('/room/:id', authenticateToken,roomController.getRoomById);



router.put('/room/:id', admin , roomController.updateRoomById)

router.delete('/room/:id', admin ,roomController.deleteRoomById);

module.exports = router;
