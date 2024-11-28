const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['user', 'admin'] },
  tickets: [{ type: mongoose.Types.ObjectId, ref: 'Ticket' }],
  prevLoginWeek: { type: Number },
});

// encripto la contraseña antes de guardar el usuario en la BBDD
userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
