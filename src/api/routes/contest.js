const { isLoggedIn, isAdmin } = require('../../middlewares/auth');
const {
  getContests,
  createContest,
  deleteContest,
  getContestById,
} = require('../controllers/contest');

const contestRouter = require('express').Router();

contestRouter.post('/', isLoggedIn, isAdmin, createContest);
contestRouter.get('/', getContests);
contestRouter.get('/:contestId', getContestById);
contestRouter.delete('/:contestId', isLoggedIn, isAdmin, deleteContest);

module.exports = contestRouter;
