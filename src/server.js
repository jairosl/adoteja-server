import express from 'express';
import 'express-async-errors';

import cors from 'cors';
import multer from 'multer';
import routes from './routes';
import AppError from './errors/AppError';

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/images', express.static(`${__dirname}/../temp`));

app.use(routes);

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}!`);
});
