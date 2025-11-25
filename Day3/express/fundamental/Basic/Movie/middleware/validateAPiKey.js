const config = require('../config.json')

function validateApiKey(req, res, next) {
    const apiKey = req.header('x-api-key');
    if (!apiKey || apiKey != config.apiKey) {
       return  res.status(401).send({ message: 'Unauthorized: Invalid or missing API key' });
    }
    next();
}

module.exports = validateApiKey;