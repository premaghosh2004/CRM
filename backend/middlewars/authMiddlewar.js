const jwt = require('jsonwebtoken');

const verifyJudgeToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).json({ message: 'Failed to authenticate token', error: err.message });
        if (decoded.role !== 'judge') return res.status(403).json({ message: 'Access denied' });

        req.userId = decoded.id;
        next();
    });
};

module.exports = { verifyJudgeToken };
