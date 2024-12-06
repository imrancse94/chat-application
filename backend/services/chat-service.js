const Chat = require('../models/Chat');
const Room = require('../models/Room');
const logger = require('../utils/logger');
const mongoose = require('mongoose');

const fetchChatHistoryByRoomId = async (room_id) => {

    try {

        const chathistory =  await Chat.findOne({ room_id: new mongoose.Types.ObjectId(room_id) });

        if(!chathistory)
        {
            return {};
        }

        return chathistory;

    } catch (err) {
        logger.error('fetch chat history :: ', err)
    }

    return [];
}


const createMessage = async ({ ...data }) => {
    try {
        const { room_id, messages } = data;

        const chatRoom = await Chat.findOne({ room_id: new mongoose.Types.ObjectId(room_id) });

        if (chatRoom) {
            // Room exists, push the new message
            await Chat.updateOne(
                { room_id }, // Find the room by its ID
                { $push: { messages } } // Push the new message to the messages array
            );
        } else {
            // Store message in MongoDB
            await Chat.create({ room_id, messages });
        }

        return true;
    } catch (err) {

    }

    return false;

}


const addUserToRoom = async ({ ...data }) => {
    try {
        const inputData = {
            user_id: data.user_id,
            participants: data.participants,
            name: data?.name || null
        }

        return await Room.create(inputData);

    } catch (err) {

    }

    return false;

}


const getParticipantsByUserId = async (userId) => {
    const chats = await Room.find({ participants : new mongoose.Types.ObjectId(userId) })
                            .populate('participants', 'name email')
                            .sort({ createdAt: -1 });
                            // .exec();

    return chats;
}

const findUpsert = async (data) => {
    const chat = await Chat.findOneAndUpdate(data);
    return chat;
}

const getRoomById = async (room_id) => {
    const room = await Room.findOne({ _id: room_id });
    return room;
}

const getRoomParticipantById = async (room_id) => {
    const room = await Room.findOne({ _id: room_id }).populate('participants', 'name email');
    return room;
}


module.exports = {
    getRoomParticipantById,
    getRoomById,
    fetchChatHistoryByRoomId,
    createMessage,
    getParticipantsByUserId,
    findUpsert,
    addUserToRoom
}