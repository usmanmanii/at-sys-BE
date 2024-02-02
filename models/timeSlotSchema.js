const mongoose = require('mongoose');
const timeSlotSchema = new mongoose.Schema({
    DayOfWeek: String,
    durationInHours: Number,
    delete: { type: Boolean, default: false }
    
  });
  const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);
  module.exports =TimeSlot