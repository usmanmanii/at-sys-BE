const Room = require('../models/roomSchema');


exports.createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json({message : "Successfully Created Room",room});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({message : "Successfully Retrived all Rooms",rooms});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getRoomById = async (req, res) => {
  const id = req.params.id;
  try {
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.status(200).json({message : "Successfully Retrived Room",room});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateRoomById = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedRoom = await Room.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedRoom) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.status(200).json({message : "Successfully Updated Room",updatedRoom});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteRoomById = async (req, res) => {
  const id = req.params.id;
  const {harddelete} = req.body;
  try {
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
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
