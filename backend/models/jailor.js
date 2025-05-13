const mongoose = require('mongoose');

const jailorSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    name: { type: String, required: true },
    role: { type: String, default: 'jailor' },
});

module.exports = mongoose.model('Jailor', jailorSchema);
