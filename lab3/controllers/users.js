// controllers/users.js
const userService = require('../services/users');
const mongoose = require('mongoose');

const createUser = async (req, res, next) => {
    const user = await userService.createUser(req.body);
    res.status(201).json({ 
        success: true, 
        message: "User created successfully", 
        data: user 
    });
};

const getAllUsers = async (req, res, next) => {
    const users = await userService.getAllUsers(req.query);
    res.status(200).json({ 
        success: true, 
        count: users.length, 
        data: users 
    });
};

const getUserById = async (req, res, next) => {
    // Note: userService expects {id}, so wrap it
    const user = await userService.getUserById({ id: req.params.id });
    res.status(200).json({ 
        success: true, 
        data: user 
    });
};

const updateUser = async (req, res, next) => {
    const { id } = req.params;
    
    // ID validation (optional - service also validates)
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ 
            success: false, 
            message: "Invalid user ID" 
        });
    }
    
    const updatedUser = await userService.updateUserById(id, req.body);
    res.status(200).json({ 
        success: true, 
        message: "User updated successfully", 
        data: updatedUser 
    });
};

const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ 
            success: false, 
            message: "Invalid user ID" 
        });
    }
    
    const deletedUser = await userService.deleteUserById(id);
    res.status(200).json({ 
        success: true, 
        message: "User deleted successfully", 
        data: deletedUser 
    });
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
