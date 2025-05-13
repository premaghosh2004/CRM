const mongoose = require('mongoose');

const CriminalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        min: 18, 
    },
    crimeType: {
        type: String,
        required: true,
        enum: ['Murder', 'Theft', 'Rape', 'Cyber'], 
    },
    jailName: {
        type: String,
        required: true,
        trim: true,
    },
    cellNo: {
        type: String,
        required: true,
        trim: true,
    },
    sentence: {
        type: Number,
        required: true,
        trim: true,
    },
}, { timestamps: true });


module.exports = mongoose.model('Criminal', CriminalSchema);
