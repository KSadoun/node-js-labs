const mongoose = require("mongoose");


// Post Schema
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    tags: Array,
    published: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;