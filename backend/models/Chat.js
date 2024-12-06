const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    room_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    messages: [
        {
            sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            text: { type: String,required: true },
            file: { type: String,default: null },
            timestamp: { type: Date, default: Date.now },
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
