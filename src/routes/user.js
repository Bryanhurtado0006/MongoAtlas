import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) {
      return res.status(400).json({ error: 'Faltan datos' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ nombre, email, password: hashedPassword });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

export default router;