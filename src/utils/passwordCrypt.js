import bcrypt from 'bcryptjs';

const generatePassword = (password) => {
  const hash = bcrypt.hashSync(password, 6);
  return hash;
};

export const verifyPassaword = (password, hash) => {
  const verify = bcrypt.compareSync(password, hash);
  return verify;
};

export default generatePassword;
