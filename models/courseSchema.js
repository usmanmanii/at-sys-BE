const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    Title: {type: String, required: true },
    Description: String,
    Credits: Number,
    Department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  });

  const Course = mongoose.model('Course', courseSchema);
  module.exports = Course;