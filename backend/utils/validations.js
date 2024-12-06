const Joi = require('joi');


// Joi validation schema for registration
const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: true } }).required(),
    password: Joi.string().min(6).required(),
});

// Joi validation schema for login
const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: true } }).required(),
    password: Joi.string().required(),
});

// Joi validation schema for chat message
const messageSchema = Joi.object({
    room_id: Joi.string().required(),
    text: Joi.string().required()
});



module.exports = {
    userSchema,
    loginSchema,
    messageSchema
}