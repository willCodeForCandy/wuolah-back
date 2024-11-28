const { isLoggedIn } = require('../../middlewares/auth');
const { useTicket } = require('../controllers/ticket');

const ticketRouter = require('express').Router();

ticketRouter.put('/:ticketId/:contestId', isLoggedIn, useTicket);

module.exports = ticketRouter;
