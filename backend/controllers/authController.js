const jwt = require('jsonwebtoken');
const Judge = require('../models/judge');
const Police = require('../models/police');
const bcrypt = require('bcrypt');
const jailor = require('../models/jailor');

const loginUser = async (req, res) => {
    const { username, password, role } = req.body; 

    try {
        let user;
        if (role === 'judge') {
            user = await Judge.findOne({ username });
        } else if (role === 'police') {
            user = await Police.findOne({ username });
        } else if (role === 'jailor') {
            user = await jailor.findOne({ username });
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        if (!user) { 
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }


        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    loginUser,
};
