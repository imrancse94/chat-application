const User = require("../models/User");
const logger = require("../utils/logger");
const bcrypt = require('bcryptjs');

const getUserByEmail = async (email, isShowPassword = false) => {
    let col = `name email _id`

    if (isShowPassword) {
        col += ` password`;
    }

    return await User.findOne({ email })
        .select(col)
        .lean()
        .exec();
}

const getUserById = async (userId, isShowPassword = false) => {

    let col = `name email _id`

    if (isShowPassword) {
        col += ` password`;
    }

    return await User.findOne({ _id: userId })
                        .select(col)
                        .lean()
                        .exec();
}


const authenticateUser = async (email, password) => {
    try {
        // true => To fetch info with password 
        const user = await getUserByEmail(email, true);
        if(!user){
            return null;
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        
        if (user && isPasswordMatched) {
            delete user.password;
            return user
        }
    } catch (err) {
        logger.error('authenticate User ::', err)
        throw err
    }

    return null;
}


const createUser = async ({ ...data }) => {
    try {
        const { email, password, name } = data;
        const user = new User({ email, password, name });
        await user.save();
        return true;
    } catch (err) {
        logger.error('Create User ::', err)
        throw err
    }

    return false;
}



const getUserList = async (user_id,searchTerm) => {

    try {

        let col = `name email isOnline _id`
        // Fetch users excluding the specified user ID
        const users = await User.find({
            _id: { $ne: user_id },
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { email: { $regex: searchTerm, $options: 'i' } } 
            ]
        }).select(col);
        return users;
    } catch (error) {
        logger.error('Create User ::', error)
        console.error('Error fetching user list:', error,searchTerm);
    }
    
    return [];
}


module.exports = {
    authenticateUser,
    getUserByEmail,
    createUser,
    getUserById,
    getUserList
}