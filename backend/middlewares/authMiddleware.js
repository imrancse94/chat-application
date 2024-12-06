const jwt = require('jsonwebtoken');
const { verifyAccessToken } = require('../utils/jwt');
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = verifyAccessToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        // console.log('error',error)
       return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
