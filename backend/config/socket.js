const { Server } = require('socket.io');
const { redisPublisher } = require('./redis');
const { publishMessage } = require('../utils/pubsub');
const { PUB_SUB_CHANNEL } = require('../utils/constant');
const { uploadFile } = require('../utils/upload');

let io;

const initializeSocket = (server) => {
    if (!io) {
        io = new Server(server, {
            cors: {
                origin: '*', // Replace with your frontend domain for production
                methods: ['GET', 'POST'],
            },
        });

        console.log('Socket.IO initialized');

        // Define connection event
        io.on('connection', (socket) => {
            console.log(`New client connected: ${socket.id}`);

            socket.on('joinRoom', (roomId) => {
                socket.join(roomId);
                console.log(`User joined room: ${roomId}`);
                io.to(roomId).emit("message", `User ${socket.id} has joined the room.`);
            });


            socket.on('message', async (data) => {
                const { roomId, sender_id, text} = data;
                const chatData = { 
                    sender_id, 
                    text,
                    timestamp: Date.now()
                };

                console.log('file',data)

                if(data?.fileName && data?.fileData){
                    const newfileName = `${chatData.timestamp}/${data.fileName}`;
                    chatData.file = newfileName;
                    uploadFile(data.fileData,chatData.timestamp.toString(),data.fileName)
                }
                // Publish to Redis channel
                // await redisPublisher.publish(`chat:${roomId}`, JSON.stringify(chatData));
                await publishMessage(PUB_SUB_CHANNEL,JSON.stringify({...chatData,['room_id']:roomId}))
                console.log(`Message from ${socket.id} in room ${roomId}: ${text}`);
                io.emit("message", { ...chatData,roomId });
            });

            socket.on('disconnect', () => {
                console.log(`Client disconnected: ${socket.id}`);
            });
        });
    }

    return io;
};

const getSocketIO = () => {
    // if (!io) {
    //     throw new Error('Socket.IO is not initialized. Call initializeSocket() first.');
    // }
    return io;
};




module.exports = { initializeSocket, getSocketIO };


