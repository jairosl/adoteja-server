import jwt from 'jsonwebtoken';
import db from '../../database';
import AppError from '../../errors/AppError';
import { verifyPassword } from '../../utils/passwordCrypt';

require('dotenv').config();

class SessionControler {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await db('users').where({ email }).first();

    if (!user)
      throw new AppError('Email / Password combination is not correct');

    if ((await verifyPassword(password, user.password)) === false)
      throw new AppError('Email / Password combination is not correct');

    const acesstoken = await jwt.sign({ user: user.uuid }, process.env.SECRET, {
      expiresIn: '7d', // expires in 7 days
    });

    res.json({ acesstoken });
  }
}

export default SessionControler;
