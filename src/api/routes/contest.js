const { isLoggedIn, isAdmin } = require('../../middlewares/auth');
const {
  getContests,
  createContest,
  editContest,
  deleteContest,
} = require('../controllers/contest');

const contestRouter = require('express').Router();

contestRouter.post('/', isLoggedIn, isAdmin, createContest);
contestRouter.get('/', getContests);
contestRouter.put('/:id', isLoggedIn, isAdmin, editContest);
contestRouter.delete('/:id', isLoggedIn, isAdmin, deleteContest);

module.exports = contestRouter;
