const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Capacity: Number,
    Location: String,
  Equipment: String,   
    delete: { type: Boolean, default: false }
    
  });
  const Room = mongoose.model('Room', roomSchema);
  module.exports =  Room;