const mongoose = require('mongoose');
const timeSlotSchema = new mongoose.Schema({
    DayOfWeek: String,
    StartTime: String,
    EndTime: String,
  });
  const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);
  module.exports =TimeSlot