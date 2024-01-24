const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: String,
    ContactInfo: {type :String, required: true},
  Department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    delete: { type: Boolean, default: false }
    
  });
  const Student = mongoose.model('Student', studentSchema);
  module.exports = Student;