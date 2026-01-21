// controllers/posts.js
const postService = require('../services/posts');
const mongoose = require('mongoose');

const createPost = async (req, res, next) => {
    const post = await postService.createPost(req.user.userId, req.body);
    res.status(201).json({ 
        success: true, 
        message: "Post created successfully", 
        data: post 
    });
};

const getAllPosts = async (req, res, next) => {
    const posts = await postService.getAllPosts(req.query, req.user.userId);
    res.status(200).json({ 
        success: true, 
        count: posts.length, 
        data: posts 
    });
};

const getPostById = async (req, res, next) => {
    const post = await postService.getPostById(req.params.id, req.user.userId);
    
    if (!post) {
        const APIError = require('../utils/APIError');
        throw new APIError("Post not found", 404);
    }
    
    res.status(200).json({ 
        success: true, 
        data: post 
    });
};

const updatePost = async (req, res, next) => {
    const { id } = req.params;
    
    const updatedPost = await postService.updatePostById(id, req.body, req.user.userId);
    
    if (!updatedPost) {
        const APIError = require('../utils/APIError');
        throw new APIError("Post not found", 404);
    }
    
    res.status(200).json({ 
        success: true, 
        message: "Post updated successfully", 
        data: updatedPost 
    });
};

const deletePost = async (req, res, next) => {
    const { id } = req.params;
    
    const deletedPost = await postService.deletePostById(id, req.user.userId);
    
    if (!deletedPost) {
        const APIError = require('../utils/APIError');
        throw new APIError("Post not found", 404);
    }
    
    res.status(200).json({ 
        success: true, 
        message: "Post deleted successfully", 
        data: deletedPost 
    });
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};