import { v4 as uuidv4 } from 'uuid';

const generateUuid = () => {
  const id = uuidv4();
  return id;
};

export default generateUuid;
