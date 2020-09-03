import fs from 'fs';
import path from 'path';
import * as Yup from 'yup';
import AppError from '../../errors/AppError';
import isErrors from '../../utils/validationSchema';

const validationPets = (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    age: Yup.number()
      .required('Age is required')
      .positive('Age have to be positive')
      .integer(),
    category: Yup.string().required('Category is required'),
    size: Yup.string().required('Size is required'),
  });

  const statusError = isErrors(schema, req.body);
  if (statusError !== false) {
    fs.unlinkSync(
      path.resolve(__dirname, '..', '..', '..', 'temp', `${req.file.filename}`)
    );
    throw new AppError(statusError);
  }

  next();
};

export const validationPetsQuery = (req, res, next) => {
  const schema = Yup.object().shape({
    age: Yup.number()
      .required('Age is required')
      .positive('Age have to be positive')
      .integer(),
    category: Yup.string().required('Category is required'),
    size: Yup.string().required('Size is required'),
    uf: Yup.string().required('Uf is required'),
    city: Yup.string().required('City is required'),
  });

  const statusError = isErrors(schema, req.query);
  if (statusError !== false) throw new AppError(statusError);

  next();
};

export default validationPets;
