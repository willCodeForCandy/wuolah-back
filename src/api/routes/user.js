const { register, login, deleteUser } = require('../controllers/user');

const userRouter = require('express').Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;
