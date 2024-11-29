const Contest = require('../models/contest');
const Ticket = require('../models/ticket');

const useTicket = async (req, res, next) => {
  try {
    const { ticketId, contestId } = req.params;
    const userId = req.user._id;
    // busco el ticket y el concurso
    const ticket = await Ticket.findById(ticketId);
    const contest = await Contest.findById(contestId);
    // creo un objeto para organizar los posibles errores
    const errors = {
      ticket: ticket.contest ? 'Ese ticket ya fue canjeado' : false,
      user:
        userId.toString() !== ticket.owner.toString()
          ? 'Ese ticket le pertenece a otro usuario'
          : false,
      contest: contest.date < new Date() ? 'Ese concurso ya pasó :(' : false,
    };
    // si no existen errores se asigna el ticket al concurso
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
    }
    // en caso de errores, la respuesta tendrá los mensajes correspondientes
    else
      return res
        .status(400)
        .json({ errors: Object.values(errors).filter(error => error) });
  } catch (error) {
    next(error);
  }
};

const getTickets = async (req, res, next) => {
  try {
    const { contestId, ticketStatus } = req.query;
    const userId = req.user._id;

    // solo buscaremos en los tickets del usuario
    const query = { owner: userId };

    // búsqueda por concurso
    if (contestId) query.contest = contestId;
    // búsqueda por estado del ticket
    if (ticketStatus === 'used') {
      query.contest = { $exists: true };
    } else if (ticketStatus === 'available') {
      query.contest = { $exists: false };
    }
    const foundTickets = await Ticket.find(query);

    return res
      .status(200)
      .json({ message: 'Tickets encontrados', foundTickets });
  } catch (error) {
    next(error);
  }
};

module.exports = { useTicket, getTickets };
