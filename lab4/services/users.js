const mongoose = require('mongoose');
const User = require('../models/users');
const util = require('util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const APIError = require('../utils/APIError');

const jwtSign = util.promisify(jwt.sign);

const signUp = async (userData) => {
    const { email, password } = userData;
    // verfiy email exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new APIError("User already exists", 400);
    }

    // extract plain password and hash it
    const hashedPassword = await bcrypt.hash(password, 12);

    // create user with hashed password
    const user = await User.create({ ...userData, password: hashedPassword });
    return user;
}

const signIn = async (userData) => {
    const { email, password } = userData;
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
        throw new APIError("email not registered", 401);
    }

    const hashed = await bcrypt.compare(password, foundUser.password);

    if(!hashed) {
        throw new APIError("password wrong", 401)
    }

    const payload = {
        userId: foundUser.id,
        role: foundUser.role
    }

    const token = await jwtSign(payload, process.env.JWT_SECRET);

    return { token, user: {...foundUser.toObject(), password: undefined }}
}

const getAllUsers = async (query) => {
    const { page = 1, limit = 2 } = query;
    const users = await User.find().skip((page-1) * limit).limit(limit);
    return users;
}

const getUserById = async (query) => {
    const { id } = query;
    if (!mongoose.isValidObjectId(id)) {
        throw new APIError("ID invalid", 400);
    }

    const user = await User.findOne({"_id": id});
    
    if (!user) {
        throw new APIError("User not found.", 404)
    }

    return user;
}

const updateUserById = async (id, userData) => {
    
    const { name, email, age } = userData;
    
    const update = await User.findOneAndUpdate({"_id": id}, {
        name,
        email,
        age
    }, { new: true });
    return update;
}

const deleteUserById = async (id) => {
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) throw new APIError("User not found", 404);
    return deleted;
}

module.exports = { signUp, signIn, getAllUsers, getUserById, updateUserById, deleteUserById };
