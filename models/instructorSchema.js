const mongoose = require('mongoose')
const instructorSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: String,
    ContactInfo: {type:String,required :true},
  Department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    delete: { type: Boolean, default: false }
    
  });
  const Instructor = mongoose.model('Instructor', instructorSchema);
  module.exports =Instructor;