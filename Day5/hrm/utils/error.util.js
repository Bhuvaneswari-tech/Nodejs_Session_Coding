// utils/error.util.js
/**
 * Sends a standardized error response to the client.
 * @param {object} res - Express response object.
 * @param {number} statusCode - HTTP status code (e.g., 400, 401, 403, 500).
 * @param {string} errorType - A short, descriptive title for the error.
 * @param {string} message - A detailed message for the user.
 */
const handleError = (res, statusCode, errorType, message) => {
    // Log the error for server-side monitoring
    console.error(`[HRM Error] ${statusCode} - ${errorType}: ${message}`); 
    
    res.status(statusCode).json({
        success: false,
        error: {
            type: errorType,
            message: message,
            timestamp: new Date().toISOString()
        }
    });
};

module.exports = { handleError };