const mongoose = require('mongoose');
const Post = require('../models/posts');

const APIError = require('../utils/APIError');


const createPost = async (userId, postData) => {
    const { title, content, author } = postData;
    if (!title || !content || !author) {
        throw new APIError("title, content and author are required fields", 400);
    }
    const post = await Post.create({ ...postData, userId })
    return post;
}

const getAllPosts = async (query, userId) => {

    const { page = 1, limit = 2 } = query;
    const posts = await Post.find({}, { password: 0 }).populate("userId", "name email").skip((page - 1) * limit).limit(limit);
    
    const postsWithOwnerFlag = posts.map(post => {
        const postObj = post.toObject();
        postObj.isOwner = postObj.userId._id.toString() === userId.toString();
        return postObj;
    });
    
    return postsWithOwnerFlag;
}

const getPostById = async (id, userId) => {

    const post = await Post.findOne({"_id": id}).populate("userId", "name email");
    
    if (!post) {
        return null;
    }

    const postObj = post.toObject();
    postObj.isOwner = postObj.userId._id.toString() === userId.toString();
    return postObj;
}

const updatePostById = async (id, postData) => {
    
    const { title, content, tags } = postData;
    
    const update = await Post.findOneAndUpdate({"_id": id}, {
        title,
        content,
        tags
    }, { new: true });
    return update;
}

const deletePostById = async (id) => {
    const deleted = await Post.findByIdAndDelete(id);
    if (!deleted) throw new APIError("Post not found", 404);
    return deleted;
}

module.exports = { createPost, getAllPosts, getPostById, updatePostById, deletePostById }; 