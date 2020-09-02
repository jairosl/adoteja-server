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
      expiresIn: '7d',
    });

    res.json({ acesstoken });
  }

  async refreshToken(req, res) {
    const { token } = req.body;

    if (!token) throw new AppError('token not found');

    try {
      const { user } = await jwt.verify(token, process.env.SECRET);
      const acesstoken = await jwt.sign({ user }, process.env.SECRET, {
        expiresIn: '10d',
      });
      res.json({ refreshToken: acesstoken });
    } catch (error) {
      throw new AppError('Token is not valid ');
    }
  }
}

export default SessionControler;
