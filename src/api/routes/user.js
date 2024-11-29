const { isLoggedIn } = require('../../middlewares/auth');
const { register, login, deleteUser } = require('../controllers/user');

const userRouter = require('express').Router();

/** POST Methods */
/**
 * @openapi
 * '/user/register':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
userRouter.post('/register', register);
/**
 * @openapi
 * '/user/login':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Login as a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *      200:
 *        description: Login successful
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
userRouter.post('/login', login);
/** DELETE Methods */
/**
 * @openapi
 * '/api/user/{userId}':
 *  delete:
 *     tags:
 *     - User Controller
 *     summary: Delete user by Id
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The unique Id of the user
 *        required: true
 *     responses:
 *      200:
 *        description: Removed
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
userRouter.delete('/:id', isLoggedIn, deleteUser);

module.exports = userRouter;
