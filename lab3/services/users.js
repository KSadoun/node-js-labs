const mongoose = require('mongoose');
const User = require('../models/users');

const APIError = require('../utils/APIError');


const createUser = async (userData) => {
    const { name, email, password, age } = userData;
    if (!name || !email || !password || !age) {
        throw new APIError("name, email, password and age are required fields", 400);
    }
    const user = await User.create(userData)
    return user;
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

module.exports = { createUser, getAllUsers, getUserById, updateUserById, deleteUserById };
