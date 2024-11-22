const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  tickets: [{ type: mongoose.Types.ObjectId, ref: 'Ticket' }],
});

const Contest = mongoose.model('contest', contestSchema);

module.exports = Contest;
