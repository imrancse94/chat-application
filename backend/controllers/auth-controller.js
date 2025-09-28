const User = require('../models/User');
const { getUserByEmail, createUser, authenticateUser, getUserById, getUserList } = require('../services/user-service');
const { generateAccessToken, verifyRefreshToken, generateRefreshToken } = require('../utils/jwt');
const logger = require('../utils/logger');
const { loginSchema, userSchema } = require('../utils/validations');

const login = async (req, res) => {

    try {
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { email, password } = req.body;

        const user = await authenticateUser(email, password);

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return res.status(200).json({ accessToken, refreshToken, user });
    } catch (error) {
        logger.error('login error',error)
        return res.status(500).json({ message: 'Unknown error' });
    }

}


const signup = async (req, res) => {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { email, password,name } = req.body;

        // Check if user already exists
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: 'Email already taken' });
        }

        await createUser({ email, password,name });

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        logger.error('signup error',error)
        return res.status(500).json({ message: 'Unknown error' });
    }
}

const refreshToken = async (req, res) => {

    const { refresh_token } = req.body;

    if (!refresh_token) return res.status(401).json({ error: 'Refresh token is required' });

    try {
        const decoded = verifyRefreshToken(refresh_token);

        if (!decoded) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        const user = await getUserById(decoded._id)

        if (!user) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return res.status(200).json({ accessToken, refreshToken, user });

    } catch (error) {
        logger.error('refreshToken error',error)
        return res.status(403).json({ error: 'Invalid token' });
    }
}


const searchUser = async (req, res) => {

    const { search } = req.query;
    
    const user_id = req.user._id;

    try {

        const users = await getUserList(user_id,search || "")

        return res.status(200).json({users});

    } catch (error) {
        logger.error('search User error',error)
        return res.status(403).json({ error: 'Unknown Error' });
    }
}


module.exports = {
    searchUser,
    login,
    signup,
    refreshToken
}