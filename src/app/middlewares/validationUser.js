import * as Yup from 'yup';
import AppError from '../../errors/AppError';
import isErrors from '../../utils/validationSchema';

const validationUser = (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    age: Yup.date().required('Age is required'),
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
    uf: Yup.string().required('Uf is required'),
    city: Yup.string().required('City is required'),
    whatsapp: Yup.number('Whatsapp needs to be a number').required(
      'Number is required'
    ),
  });

  const statusError = isErrors(schema, req.body);

  if (statusError !== false) {
    throw new AppError(statusError);
  }

  next();
};

export default validationUser;
