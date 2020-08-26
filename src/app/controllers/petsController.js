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
      .returning('uuid', 'name');

    res.json(pet);
  }

  async show(req, res) {
    const { uuid_user } = req;
    const { uf, city, category, size, age } = req.query;

    const user = await db('users').where({ uuid: uuid_user }).first();
    if (!user) throw new AppError('User not found');

    const pets = await db('pets')
      .where({ uuid_user })
      .where('pets.age', Number(age))
      .where('pets.category', category)
      .where('pets.size', size)
      .join('users', 'pets.uuid_user', 'users.uuid')
      .where('uf', uf)
      .where('city', city)
      .select([
        { uuid_pet: 'pets.uuid' },
        'image',
        { name_pet: 'pets.name' },
        'email',
        'whatsapp',
      ]);

    res.json(pets);
  }

  async index(req, res) {
    const { uuid_pet: uuid } = req.params;

    const pet = await db('pets')
      .where('pets.uuid', uuid)
      .join('users', 'pets.uuid_user', 'users.uuid')
      .select([
        { uuid_pet: 'pets.uuid' },
        'image',
        { name_pet: 'pets.name' },
        { age_pet: 'pets.age' },
        { size_pet: 'pets.size' },
        { category_pet: 'pets.category' },
        'email',
        'whatsapp',
      ]);

    res.json(pet);
  }
}

export default PetsController;
