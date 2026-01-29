const express = require('express');
const router = express.Router();
const schemas = require('../schemas');
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate')
const restrictTo = require('../middlewares/restrictTo')

const usersController = require('../controllers/users');

router.post("/sign-up", validate(schemas.signUpSchema), usersController.signUp);
router.post("/sign-in", validate(schemas.signInSchema), usersController.signIn);
router.get("/", authenticate, restrictTo(['admin', 'user']), validate(schemas.getAllUsersSchema), usersController.getAllUsers);
router.get("/:id", authenticate, restrictTo(['admin', 'user']), usersController.getUserById);
router.patch("/:id", authenticate, restrictTo(['admin']), validate(schemas.updateUserSchema), usersController.updateUser);
router.delete("/:id", authenticate, restrictTo(['admin']),  usersController.deleteUser);

module.exports = router;
