const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    caseType: { type: String, required: true },
    urgency: { type: String, required: true },
    caseSummary: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    
    // Progress Fields
    meetingsHeld: { type: Number, default: 0 },
    progress: { type: Number, default: 20 },

    // NEW FIELD: To store the matched lawyer
    assignedLawyer: { type: String, default: 'Pending Assignment' } 
}, { timestamps: true });

module.exports = mongoose.model('Case', caseSchema);