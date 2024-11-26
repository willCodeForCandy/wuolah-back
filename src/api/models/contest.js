const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    tickets: [{ type: mongoose.Types.ObjectId, ref: 'Ticket' }],
  },
  { timestamps: true }
);

const Contest = mongoose.model('contest', contestSchema);

module.exports = Contest;
