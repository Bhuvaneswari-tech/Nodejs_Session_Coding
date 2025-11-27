// middleware/rbac.middleware.js
const { handleError } = require('../utils/error.util');

const authorizeRoles = (allowedRoles) => {
    return (req, res, next) => {
        // req.user is populated by auth.middleware.js
        if (!req.user || !req.user.role) {
            return handleError(res, 403, 'Forbidden', 'User role not found in token.');
        }

        const userRole = req.user.role;
        
        if (allowedRoles.includes(userRole)) {
            next(); // Role is authorized
        } else {
            return handleError(res, 403, 'Forbidden', 
                `Role '${userRole}' does not have permission to perform this action.`);
        }
    };
};

module.exports = authorizeRoles;