const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: String,
    ContactInfo: {type :String, required: true},
    Department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  });
  const Student = mongoose.model('Student', studentSchema);
  module.exports = Student;