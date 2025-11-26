const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  level: 'error',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' })
  ]
});

module.exports = (err, req, res, next) => {
  logger.error(err.stack || err.message || err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
};
