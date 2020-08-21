import jwt from 'jsonwebtoken';
import AppError from '../../errors/AppError';

require('dotenv').config();

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError('token not found');

  const token = authHeader.split(' ')[1];

  try {
    const { user } = await jwt.verify(token, process.env.SECRET);
    req.uuid_user = user;
    next();
  } catch (error) {
    throw new AppError('Token is not valid ');
  }
};

export default authenticateJWT;
