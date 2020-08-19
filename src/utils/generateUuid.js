import { v4 as uuidv4 } from 'uuid';

const uuid = () => {
  const id = uuidv4();
  return id;
};

export default uuid;
