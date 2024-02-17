const Room = require('../models/roomSchema');
const TryCatchAynsc = require('../middleware/TryCatchAysnc');
const pagelimit = require('../utils/pagelimit');

exports.createRoom = TryCatchAynsc( async (req, res) => {
  
    const room = new Room(req.body);
    await room.save();
    res.status(201).json({message : "Successfully Created Room",room});
  
});


exports.getAllRooms = TryCatchAynsc(async (req, res) => {
  
    const rooms = await Room.find();
    const { page, limit , skip } = await pagelimit(req);
    rooms = await Room.find().skip(skip).limit(limit);
    res.status(200).json({message : "Successfully Retrived all Rooms",rooms , roomscount: rooms.length});
  
});


exports.getRoomById = TryCatchAynsc(async (req, res) => {
  const id = req.params.id;
  
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.status(200).json({message : "Successfully Retrived Room",room});
 
});


exports.updateRoomById = TryCatchAynsc(async (req, res) => {
  const id = req.params.id;
  
    const updatedRoom = await Room.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedRoom) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.status(200).json({message : "Successfully Updated Room",updatedRoom});
  
});


exports.deleteRoomById = TryCatchAynsc(async (req, res) => {
  const id = req.params.id;
  const {harddelete} = req.body;
  
   if (!harddelete) {
      const room = await Room.findByIdAndUpdate(id,
        { delete: true },
        { new: true }
      );
      res.status(200).json({ message: "Room deleted softly successfully" });
      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }
    }
    else {
      const room = await Room.findByIdAndDelete(id);
      if (!room) {
        res.status(404).json({ message: "Room not found" });
      }
      res.status(200).json({ message: "Room deleted hardly successfully" });

    }
  
});
