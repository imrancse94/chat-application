const express = require('express');

const { 
    login, 
    signup, 
    refreshToken, 
    searchUser 
} = require('../controllers/auth-controller');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/refresh-token', refreshToken);

router.get('/search-user', authMiddleware, searchUser);

module.exports = router;
