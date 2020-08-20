import { v4 as uuidv4 } from 'uuid';

const genereteUuid = () => {
  const id = uuidv4();
  return id;
};

export default genereteUuid;
