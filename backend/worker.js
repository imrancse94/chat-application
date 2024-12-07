const dotenv = require('dotenv');
const connectDB = require('./config/db');

const { subscribeToChannel } = require('./utils/pubsub');
const { PUB_SUB_CHANNEL } = require('./utils/constant');

dotenv.config();
connectDB();

subscribeToChannel(PUB_SUB_CHANNEL)

