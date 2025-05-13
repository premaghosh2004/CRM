const mongoose = require('mongoose');

const policeSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    name: { type: String, required: true },
    role: { type: String, default: 'police' },
});

module.exports = mongoose.model('Police', policeSchema);
