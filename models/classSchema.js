const mongoose = require('mongoose');
const classSchema = new mongoose.Schema({
    Semester: {type: Number , required : true},
    Year: {type:Number,required : true},
    Course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    Instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true },
    Room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    TimeSlot: { type: mongoose.Schema.Types.ObjectId, ref: 'TimeSlot', required: true },
    delete: { type: Boolean, default: false }
  });

  const Class = mongoose.model('Class', classSchema);
  module.exports = Class