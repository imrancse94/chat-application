const winston = require('winston');
require('winston-daily-rotate-file');

// Define the transport (where the logs will be saved)
const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/%DATE%-app.log', // Logs will be saved in 'logs' folder with day-wise rotation
  datePattern: 'YYYY-MM-DD', // Logs will be created day-wise
  zippedArchive: true, // Archive old log files
  maxSize: '20m', // Maximum size for each log file
  maxFiles: '14d' // Keep logs for the last 14 days
});

// Create a logger instance
const logger = winston.createLogger({
  level: 'info', // Log level (info, debug, warn, error)
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // Log format in JSON
  ),
  transports: [
    dailyRotateFileTransport, // Use daily rotate file transport
    new winston.transports.Console({ format: winston.format.simple() }) // Log to the console as well
  ],
});

module.exports = logger;
