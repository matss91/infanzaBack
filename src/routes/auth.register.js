

// Importar Express y crear el router
const express = require('express');
const router = express.Router();

// Importar el modelo de usuario (Mongoose)
const User = require('../models/User'); // Ajusta la ruta según tu proyecto

// Importar bcrypt para encriptar contraseñas
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validar datos
  if (!username || !email || !password) {
    return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
  }

  try {
    // Verificar si el usuario ya existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Crear usuario
    user = new User({
      username,
      email,
      password
    });

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Guardar en DB
    await user.save();

    res.status(201).json({ msg: 'Usuario creado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;