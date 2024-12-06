const { createMessage } = require('../services/chat-service');
const redis = require('./../config/redis');
const { PUB_SUB_CHANNEL } = require('./constant');
const { uploadFile } = require('./upload');

const publishMessage = async (channel, message) => {
    await redis.publish(channel, message);
    console.log(`Published: "${message}" to channel: "${channel}"`);
}


const subscribeToChannel = async (channel) => {
    redis.subscribe(channel, (err, count) => {
        if (err) {
            console.error('Failed to subscribe:', err.message);
        } else {
            console.log(`Subscribed to ${channel}. Currently subscribed to ${count} channel(s).`);
        }
    });

    redis.on('message', (channel, message) => {
        console.log(`Received message: "${message}" from channel: "${channel}"`);

        switch (channel) {
            case PUB_SUB_CHANNEL:
                if (message) {
                    const data = JSON.parse(message);
                    // console.log('payload',data);
                    
                    
                    createMessage({
                        room_id: data.room_id,
                        messages: [
                            {
                                sender_id: data.sender_id,
                                text: data.text,
                                file: data?.file || null,
                                timestamp: data.timestamp
                            },
                        ],
                    }).then(result => {
                        console.log('status of insert', result)
                    }).catch(err => {
                        console.log('error of insert', err)
                    });

                }
                break;

            default:
        }

    });
}

module.exports = {
    publishMessage,
    subscribeToChannel
}