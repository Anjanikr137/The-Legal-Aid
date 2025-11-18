const mongoose = require('mongoose');

const lawyerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: String,
    description: String,
    location: String,
    rating: String,
    experience: String,
    img: String
});

module.exports = mongoose.model('Lawyer', lawyerSchema);