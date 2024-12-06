const client = require('./../config/redis');
const logger = require('./logger');

const pushCache = async (key, value, toEnd = true) => {
    try {
        const cacheClient = await client()
        const timestamp = Date.now();
        const data = JSON.stringify({ timestamp, ['data']: value });

        if (toEnd) {
            await cacheClient.rPush(key, data); // Push to the end of the list
        } else {
            await cacheClient.lPush(key, data); // Push to the start of the list
        }

    } catch (err) {
        logger.error('Set Cache error', err)
    }
}

const getPushedValuesByKey = async (key) => {
    try {
        const cacheClient = await client()
        const cachedValue = await cacheClient.lrange(key, 0, -1);
        console.log('message',cachedValue)
        if (!cachedValue) {
            return null
        }

        const value = JSON.parse(cachedValue);

        return value?.data || null;
    } catch (err) {
        logger.error('Get Cache error', err)
    }

    return null;
}

const getCacheListByPrefix = async (prefix) => {
    try {
        const cacheClient = await client()
        const keys = await cacheClient.keys(`${prefix}*`);
        const values = await cacheClient.mget(keys);
        keys.map((key, index) => ({ key, value: values[index] }));
        console.log('data',keys)
        return data?.map(d=>({...JSON.parse(d).data})) || [];
    } catch (err) {
        logger.error('Set Cache error', err)
    }
}

const setCache = async (key, value) => {
    try {
        const cacheClient = await client()
        const timestamp = Date.now();
        await cacheClient.set(key, JSON.stringify({ timestamp, ['data']: value }));
    } catch (err) {
        logger.error('Set Cache error', err)
    }
}

const getCache = async (key) => {
    try {
        const cacheClient = await client()
        const cachedValue = await cacheClient.get(key);
        console.log('message',cachedValue)
        if (!cachedValue) {
            return null
        }

        const value = JSON.parse(cachedValue);

        return value?.data || null;
    } catch (err) {
        logger.error('Get Cache error', err)
    }

    return null;
}

const getCacheKeys = async (key) => {
    try {
        const cacheClient = await client()
        const messages = await cacheClient.keys(key);
        return messages
    } catch (err) {
        logger.error('Get Cache keys error', err)
    }

    return null;
}

const removeCache = async (key) => {
    try {
        const cacheClient = await client()
        await cacheClient.del(key);
    } catch (err) {
        logger.error('Get Cache keys error', err)
    }

    return null;
}


const getKeysByPrefix = (prefix) => {
    let cursor = '0'; // Cursor to track the scan position
    let matchingKeys = []; // Array to store matching keys
  
    function scan() {
      // SCAN command to iterate over keys in Redis
      client.scan(cursor, 'MATCH', `${prefix}*`, 'COUNT', 100, function (err, reply) {
        if (err) {
          console.error('Error scanning keys:', err);
          return;
        }
  
        // Update cursor with the next position
        cursor = reply[0];
        // Add the matching keys to the array
        matchingKeys = matchingKeys.concat(reply[1]);
  
        // If cursor is '0', it means the scan is complete
        if (cursor === '0') {
          console.log('Matching keys:', matchingKeys);
          client.quit(); // Close the Redis connection
        } else {
          // Continue scanning if there are more keys
          scan();
        }
      });
    }
  
    // Start scanning
    scan();
  }


  async function fetchValuesForKeys(keys) {
    const client = await cacheClient()
    const keyValueObject = {};
    
    for (const key of keys) {
      await new Promise((resolve, reject) => {
        client.get(key, (err, value) => {
          if (err) {
            return reject(err);
          }
          keyValueObject[key] = value; // Add to result object
          resolve();
        });
      });
    }
  }


  const getMget = async (keys) => {

    const cacheClient = await client()
    const values = await cacheClient.mget(keys);

    return values;
  }

module.exports = {
    getMget,
    setCache,
    getCache,
    getCacheKeys,
    removeCache,
    pushCache,
    getCacheListByPrefix,
    getKeysByPrefix,
    getPushedValuesByKey
}