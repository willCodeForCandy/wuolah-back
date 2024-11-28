const Contest = require('../models/contest');
const Ticket = require('../models/ticket');

const useTicket = async (req, res, next) => {
  try {
    const { ticketId, contestId } = req.params;
    const userId = req.user._id;

    const ticket = await Ticket.findById(ticketId);
    const contest = await Contest.findById(contestId);

    const errors = {
      ticket: ticket.contest ? 'Ese ticket ya fue canjeado' : false,
      user:
        userId.toString() !== ticket.owner.toString()
          ? 'Ese ticket le pertenece a otro usuario'
          : false,
      contest: contest.date < new Date() ? 'Ese concurso ya pasó :(' : false,
    };

    if (Object.values(errors).every(value => value === false)) {
      const updatedTicket = await Ticket.findByIdAndUpdate(
        ticketId,
        {
          contest: contestId,
        },
        { new: true }
      );
      const updatedContest = await Contest.findByIdAndUpdate(
        contestId,
        {
          tickets: [...contest.tickets, ticketId],
        },
        { new: true }
      );
      return res.status(200).json({
        message: '1 participación agregada al concurso',
        updatedTicket,
        updatedContest,
      });
    } else
      return res
        .status(400)
        .json({ errors: Object.values(errors).filter(error => error) });
  } catch (error) {
    next(error);
  }
};

module.exports = { useTicket };
