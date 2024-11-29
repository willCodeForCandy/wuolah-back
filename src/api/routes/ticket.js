const { isLoggedIn } = require('../../middlewares/auth');
const { useTicket, getTickets } = require('../controllers/ticket');

const ticketRouter = require('express').Router();

ticketRouter.put('/:ticketId/:contestId', isLoggedIn, useTicket);
ticketRouter.get('/', isLoggedIn, getTickets);

module.exports = ticketRouter;
