const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Address: String,
    ContactInfo: String,
    delete: { type: Boolean, default: false }

});

const university = mongoose.model('University', universitySchema);

module.exports = university;
