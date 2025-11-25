function logger(req, res, next) {
    console.log(`[[logger] Request Type : ${req.method} - Request Protocol: ${req.protocol}, URL: '${req.url}' ]`);
    next();
}

module.exports = logger;