import db from '../../database';
import AppError from '../../errors/AppError';
import generateUuid from '../../utils/generateUuid';

class PetsController {
  async create(req, res) {
    const { name, age, category, size } = req.body;

    const user = await db('users').where({ uuid: req.uuid_user }).first();

    if (!user) throw new AppError('User not found');

    const uuid = await generateUuid();

    const pet = await db('pets')
      .insert({
        uuid,
        uuid_user: req.uuid_user,
        image: req.file.filename,
        name,
        age,
        category,
        size,
      })
      .returning('*');

    res.json(pet);
  }
}

export default PetsController;
