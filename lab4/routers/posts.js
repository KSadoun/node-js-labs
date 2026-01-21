// routers/posts.js
const express = require('express');
const router = express.Router();
const schemas = require('../schemas');
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate')


// Import controllers (not services)
const postsController = require('../controllers/posts');

// Routes - clean and simple
router.post("/", authenticate, validate(schemas.createPostSchema), postsController.createPost);
router.get("/",  authenticate, validate(schemas.getAllPostsSchema), postsController.getAllPosts);
router.get("/:id", authenticate, postsController.getPostById);
router.patch("/:id", authenticate, validate(schemas.updatePostSchema), postsController.updatePost);
router.delete("/:id", authenticate, postsController.deletePost);
module.exports = router; 