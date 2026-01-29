const express = require('express');
const router = express.Router();
const schemas = require('../schemas');
const validate = require('../middlewares/validate');

const postsController = require('../controllers/posts');


router.post("/", validate(schemas.createPostSchema), postsController.createPost);
router.get("/",  validate(schemas.getAllPostsSchema), postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.patch("/:id", validate(schemas.updatePostSchema), postsController.updatePost);
router.delete("/:id", postsController.deletePost);

module.exports = router; 