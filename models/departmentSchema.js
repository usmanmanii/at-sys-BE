const mongoose = require('mongoose');
const departmentSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    HeadOfDepartment: {type:String,required: true},
    ContactInfo: String,
    University: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
  });
  const Department = mongoose.model('Department', departmentSchema);
  module.exports = Department;