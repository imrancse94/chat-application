const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { createBulkMessage, findUpsert } = require('./services/chat-service');
const { getMget,getCache,getPushedValuesByKey,getCacheListByPrefix, getCacheKeys, removeCache } = require('./utils/cache');
const { subscribeToChannel } = require('./utils/pubsub');
const { PUB_SUB_CHANNEL } = require('./utils/constant');

dotenv.config();
connectDB();

const INTERVAL = 15; // Process every 15 min

const processMessages = async () => {
    try {
        // Fetch all user keys
        const keys = await getCacheKeys('chat:*');
        console.log('test1',await getMget(keys))

        console.log('keys',keys)

        for (const key of keys) {
            
            const message = await getPushedValuesByKey(key);
            
            console.log('test',message)

            if (message) {

                // await findUpsert(
                //     { participants: { $all: [userId, otherUserId] } },
                //     { $push: { messages: { $each: messages } } },
                //     { new: true, upsert: true }
                // );
            
                console.log(`inserted ${JSON.stringify(message)} for user`);

                // Remove from Redis
                await removeCache(key);
                console.log(`Removed messages from Redis for user`);
            }
        }


    } catch (error) {
        console.error(`Error processing messages: ${error.message}`);
    }
};

// Run the worker continuously
subscribeToChannel(PUB_SUB_CHANNEL)
// setInterval(processMessages, INTERVAL * 60 * 1000);
