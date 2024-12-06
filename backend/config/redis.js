const Redis = require('ioredis');

// Create Redis connections
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});



module.exports = redis;

