// src/middleware/rbac.js

// roles: ['admin', 'user']
const authorize = (roles = []) => {
    // If roles is a single string, convert it to an array
    if (typeof roles === 'string') {
        roles = [roles];
    }

    // Return the middleware function
    return (req, res, next) => {
        // req.user is populated by the 'protect' middleware
        if (!req.user || !roles.includes(req.user.role)) {
            // User's role is not in the allowed list
            return res.status(403).json({ 
                message: `Forbidden: Access denied. Required roles: ${roles.join(', ')}`
            });
        }
        next();
    };
};

module.exports = authorize;