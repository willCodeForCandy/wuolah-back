const Contest = require('../models/contest');

const createContest = async (req, res, next) => {
  try {
    const newContest = new Contest({
      name: req.body.name,
      description: req.body.description,
      date: new Date(req.body.date),
    }); // Me aseguro de que no se agreguen tickets al crear el concurso, y de que la fecha tenga un formato válido

    const savedContest = await newContest.save();
    return res.status(201).json({
      message: `Evento ${savedContest.name} creado correctamente`,
      newContest,
    });
  } catch (error) {
    next(error);
  }
};

const getContests = async (req, res, next) => {
  try {
    const allContests = await Contest.find().populate({
      path: 'tickets',
      populate: {
        path: 'owner',
        select: 'email',
      },
    });
    return res.status(200).json(allContests);
  } catch (error) {
    next(error);
  }
};

const getContestById = async (req, res, next) => {
  try {
    const { contestId } = req.params;
    const contest = await Contest.findById(contestId).populate({
      path: 'tickets',
      populate: {
        path: 'owner',
        select: 'email',
      },
    });
    return res.status(200).json(contest);
  } catch (error) {
    next(error);
  }
};

const deleteContest = async (req, res, next) => {
  try {
    const { contestId } = req.params;

    const deletedContest = await Contest.findByIdAndDelete(id);
    return res
      .status(200)
      .json(`Concurso ${deletedContest.name} eliminado exitosamente`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createContest,
  getContests,
  getContestById,
  deleteContest,
};
