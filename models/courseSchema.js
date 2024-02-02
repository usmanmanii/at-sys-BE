const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    Title: {type: String, required: true },
    Description: String,
  Credits: { type: Number , enum:[1,2,3], required: true},
    Department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    delete: { type: Boolean, default: false }
    
  });

  const Course = mongoose.model('Course', courseSchema);
  module.exports = Course;