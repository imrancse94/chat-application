const { fetchChatHistoryByRoomId, getParticipantsByUserId, addUserToRoom, getRoomById, getRoomParticipantById} = require("../services/chat-service");
const { getSocketIO } = require("../config/socket");
const { FILE_UPLOAD_DIR, PUB_SUB_CHANNEL } = require("../utils/constant");
const { messageSchema } = require("../utils/validations");
const path = require('path')
const fs = require('fs');


const chatHistory = async (req, res) => {

    const { room_id } = req.params;

    try {

        if (!room_id) {
            throw Error('Room id is required');
        }

        const messages = await fetchChatHistoryByRoomId(room_id);

        if (Object.keys(messages).length == 0) {
            return res.status(200).json({
                data:[],
                message: 'Not found any chat'
            })
        }

      return res.status(200).json({
            message: 'Fetched successfully',
            data: messages
        })

    } catch (err) {

        return res.status(500).json({
            message: err.message
        })

    }

}

const fileDownload = async (req, res) => {
    const filePath = path.join(path.resolve(__dirname, '..'), FILE_UPLOAD_DIR,  req.params.dir+"/"+req.params.filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: 'File not found' });
        }

        res.download(filePath, (downloadErr) => {
            if (downloadErr) {
                return res.status(500).json({ error: 'Error downloading file' });
            }
        });
    });
}

const associateUserToRoom = async (req, res) => {

    const { participants, name } = req.body;

    try {

        if (!participants || participants?.length == 0) {
            return res.status(200).json({ error: 'participants is required' });
        }

        const auth_user_id = req.user._id;

        const room = await addUserToRoom({
            user_id: auth_user_id,
            participants:[...participants,auth_user_id],
            name
        })

        if (!room) {
            throw Error('Failed to add')
        }
        
        const result = room?._id ? await getRoomParticipantById(room?._id) : {};

        return res.status(200).json({ message: 'User added to chat successfully', data:result });

    } catch (error) {
        return res.status(500).json({ error: error.message,data:[] });
    }
}

const getRoomList = async (req, res) => {

    const auth_user_id = req.user._id;

    try {

        // Fetch chats where the user is a participant
        const chats = await getParticipantsByUserId(auth_user_id)

        if (!chats?.length) {
            return res.status(200).json({users:[], message: 'No users found' });
        }

        return res.status(200).json({ users: chats });

    } catch (error) {

        return res.status(500).json({ error: 'An error occurred while fetching chatted users' });
    }
}


const sendMessage = async (req, res) => {

    const { error } = messageSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
    
        const { room_id, text } = req.body;
    
        const sender_id = req.user._id; // Authenticated user ID

        const room = await getRoomById(room_id);

        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        // Construct the message object
        const message = {
            room_id,
            sender_id,
            text,
            file: req?.file?.filename || null,
            timestamp: Date.now(),
        };

        // Push message to Redis list
        // await pushCache(`messages:${room_id}`, JSON.stringify(message));
        // await publishMessage(PUB_SUB_CHANNEL,JSON.stringify(message))


        const io = getSocketIO();
        // Emit the message to connected users via Socket.IO
        if(io){
            io.to(room_id).emit('message', message);
        }
        

        return res.status(201).json({ success: true, message });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = {
    chatHistory,
    sendMessage,
    fileDownload,
    associateUserToRoom,
    getRoomList
}