const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Judge = require('../models/judge');
const Police = require('../models/police');
const jailor = require('../models/jailor');

const registerJudge = async (req, res) => {
    try {
        const { username, password, name } = req.body;

        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newJudge = new Judge({
            username,
            password: hashedPassword,
            name
        });

        await newJudge.save();
        res.status(201).json({ message: 'Judge registered successfully', judge: newJudge });
    } catch (error) {
        res.status(500).json({ message: 'Error registering judge', error: error.message });
    }
};

const registerPolice = async (req, res) => {
    try {
        const { username, password, name } = req.body;

        // Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        const newPolice = new Police({
            username,
            password: hashedPassword,
            name
        });

        await newPolice.save();
        res.status(201).json({ message: 'Police registered successfully', judge: newPolice });
    } catch (error) {
        res.status(500).json({ message: 'Error registering judge', error: error.message });
    }
};

const registerJailor = async (req, res) => {
    try {
        const { username, password, name } = req.body;

        // Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        const newJailor = new jailor({
            username,
            password: hashedPassword,
            name
        });

        await newJailor.save();
        res.status(201).json({ message: 'Jailor registered successfully', judge: newJailor });
    } catch (error) {
        res.status(500).json({ message: 'Error registering jailor', error: error.message });
    }
};

const loginJudge = async (req, res) => {
    try {
        const { username, password } = req.body;
        const judge = await Judge.findOne({ username });

        if (!judge) return res.status(404).json({ message: 'Judge not found' });

        
        const isMatch = await bcrypt.compare(password, judge.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        
        const token = jwt.sign({ id: judge._id, role: judge.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(token)
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

module.exports = { registerJudge, loginJudge, registerPolice, registerJailor };
