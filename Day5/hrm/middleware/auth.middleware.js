// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const { handleError } = require('../utils/error.util');

const verifyToken = (req, res, next) => {
    // 1. Get token from header (Bearer <token>)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return handleError(res, 401, 'Unauthorized', 'No token provided. Access denied.');
    }
    const token = authHeader.split(' ')[1];

    // 2. Verify token
    try {
        // Decodes the token signature and checks expiry
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        // Attach user info (ID and role) to the request object
        req.user = decoded; 
        next();
    } catch (err) {
        // Handle expired (JsonWebTokenError: jwt expired), malformed, or invalid tokens
        return handleError(res, 403, 'Forbidden', 'Invalid or expired token. Access denied.');
    }
};

module.exports = verifyToken;