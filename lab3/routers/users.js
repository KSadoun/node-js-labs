// routers/users.js
const express = require('express');
const router = express.Router();
const schemas = require('../schemas');
const validate = require('../middlewares/validate');



// Import controllers (not services)
const usersController = require('../controllers/users');

// Routes - clean and simple
router.post("/", validate(schemas.createUserSchema), usersController.createUser);
router.get("/",  validate(schemas.getAllUsersSchema), usersController.getAllUsers);
router.get("/:id", usersController.getUserById);
router.patch("/:id", validate(schemas.updateUserSchema), usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

module.exports = router;
