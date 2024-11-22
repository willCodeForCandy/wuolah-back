const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    contest: { type: mongoose.Types.ObjectId, ref: 'Contest' },
    owner: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true, // Para controlar cuándo obtuvo el ticket el usuario
  }
);

const Ticket = mongoose.model('ticket', ticketSchema);

module.exports = Ticket;
