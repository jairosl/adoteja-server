import bcrypt from 'bcryptjs';

const generateHashPassword = (password) => {
  const hash = bcrypt.hashSync(password, 6);
  return hash;
};

export const verifyPassword = (password, hash) => {
  const verify = bcrypt.compareSync(password, hash);
  return verify;
};

export default generateHashPassword;
