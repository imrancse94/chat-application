const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');

const {
    chatHistory,
    sendMessage, 
    getRoomList,
    associateUserToRoom,
    fileDownload
} = require('../controllers/chat-controller');

const upload = require('../config/multer');


const router = express.Router();

router.post('/message', authMiddleware, upload.single('file'), sendMessage);

router.post('/add-to-room', authMiddleware, associateUserToRoom);

router.get('/file-download/:dir/:filename', fileDownload);

router.get('/rooms', authMiddleware, getRoomList);

router.get('/:room_id', authMiddleware, chatHistory);

module.exports = router;
