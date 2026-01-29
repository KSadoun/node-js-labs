const postService = require('../services/posts');
const mongoose = require('mongoose');

const createPost = async (req, res, next) => {
    const post = await postService.createPost(req.body);
    res.status(201).json({ 
        success: true, 
        message: "Post created successfully", 
        data: post 
    });
};

const getAllPosts = async (req, res, next) => {
    const posts = await postService.getAllPosts(req.query);
    res.status(200).json({ 
        success: true, 
        count: posts.length, 
        data: posts 
    });
};

const getPostById = async (req, res, next) => {

    const post = await postService.getPostById({ id: req.params.id });
    res.status(200).json({ 
        success: true, 
        data: post 
    });
};

const updatePost = async (req, res, next) => {
    const { id } = req.params;
    
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ 
            success: false, 
            message: "Invalid post ID" 
        });
    }
    
    const updatedPost = await postService.updatePostById(id, req.body);
    res.status(200).json({ 
        success: true, 
        message: "Post updated successfully", 
        data: updatedPost 
    });
};

const deletePost = async (req, res, next) => {
    const { id } = req.params;
    
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ 
            success: false, 
            message: "Invalid post ID" 
        });
    }
    
    const deletedPost = await postService.deletePostById(id);
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