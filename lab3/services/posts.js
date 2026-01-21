const mongoose = require('mongoose');
const Post = require('../models/posts');

const APIError = require('../utils/APIError');


const createPost = async (postData) => {
    const { title, content, author } = postData;
    if (!title || !content || !author) {
        throw new APIError("title, content and author are required fields", 400);
    }
    const post = await Post.create(postData)
    return post;
}

const getAllPosts = async (query) => {
    const { page = 1, limit = 2 } = query;
    const posts = await Post.find().skip((page-1) * limit).limit(limit);
    return posts;
}

const getPostById = async (query) => {
    const { id } = query;
    if (!mongoose.isValidObjectId(id)) {
        throw new APIError("ID invalid", 400);
    }

    const post = await Post.findOne({"_id": id});
    
    if (!post) {
        throw new APIError("Post not found.", 404)
    }

    return post;
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