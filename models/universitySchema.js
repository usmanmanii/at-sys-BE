const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Address: String,
    ContactInfo: String,
});

const university = mongoose.model('University', universitySchema);

module.exports = university;
