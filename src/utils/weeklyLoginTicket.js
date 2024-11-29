const Ticket = require('../api/models/ticket');

const giveWeeklyTicket = async (lastLogin, userId, thisWeek) => {
  try {
    const firstLogin = !lastLogin;
    // si el último login fue hace una semana o es la primera vez que el usuario se loguea
    if (thisWeek - lastLogin === 1 || firstLogin) {
      // genero un nuevo ticket y se lo asigno al usuario
      const newTicket = new Ticket({ owner: userId });
      const savedTicket = await newTicket.save();
      return savedTicket._id;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { giveWeeklyTicket };
