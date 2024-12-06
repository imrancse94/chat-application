const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, default: null },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
