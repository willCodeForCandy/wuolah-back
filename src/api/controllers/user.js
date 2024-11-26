const { generateSign } = require('../../config/jwt');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
  try {
    // Primero chequeo que no exista otro usuario con el mismo email
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json('Ya existe un usuario con ese email');
    }
    // Si no existe, procedo a crear el nuevo usuario
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      role: 'user', // Los usuarios serán user por default. Los admin se asignan manualmente
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      message: `Usuario ${savedUser.email} creado exitosamente`,
      id: savedUser.id,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const validPassword = bcrypt.compareSync(req.body.password, user?.password);

    if (user && validPassword) {
      const token = generateSign(user._id);
      return res.status(200).json({ message: 'Login exitoso', user, token });
    } else {
      return res.status(401).json('Email o contraseña incorrectos.');
    }
  } catch (error) {
    next(error);
  }
};

const editUser = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    return res
      .status(200)
      .json(`Usuario ${deletedUser.email} eliminado exitosamente`);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, editUser, deleteUser };
