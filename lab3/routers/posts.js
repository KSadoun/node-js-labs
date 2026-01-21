// routers/posts.js
const express = require('express');
const router = express.Router();
const schemas = require('../schemas');
const validate = require('../middlewares/validate');



// Import controllers (not services)
const postsController = require('../controllers/posts');

// Routes - clean and simple
router.post("/", validate(schemas.createPostSchema), postsController.createPost);
router.get("/",  validate(schemas.getAllPostsSchema), postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.patch("/:id", validate(schemas.updatePostSchema), postsController.updatePost);
router.delete("/:id", postsController.deletePost);

module.exports = router; 