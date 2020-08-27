import fs from 'fs';
import path from 'path';
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
      .returning(['uuid', 'name']);

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
      ])
      .first();

    if (!pet) {
      throw new AppError('Pet not found');
    }

    res.json(pet);
  }

  async update(req, res) {
    const { uuid_pet: uuid } = req.params;
    const { name, age, category, size } = req.body;

    const pet = await db('pets')
      .where({ uuid })
      .where({ uuid_user: req.uuid_user })
      .first();

    if (!pet) {
      fs.unlinkSync(
        path.resolve(
          __dirname,
          '..',
          '..',
          '..',
          'temp',
          `${req.file.filename}`
        )
      );
      throw new AppError('Pet not Found');
    }

    if (!req.file) {
      await db('pets').where({ uuid }).update({
        name,
        age,
        category,
        size,
      });

      res.status(200).send();
    } else {
      fs.unlinkSync(
        path.resolve(__dirname, '..', '..', '..', 'temp', `${pet.image}`)
      );

      await db('pets').where({ uuid }).update({
        name,
        age,
        category,
        size,
        image: req.file.filename,
      });

      res.status(200).send();
    }
  }

  async delete(req, res) {
    const { uuid_pet: uuid } = req.params;

    const pet = await db('pets').where({ uuid }).first();

    if (!pet) throw new AppError('Pet not Found');

    await db('pets').where({ uuid }).where('uuid_user', req.uuid_user).del();

    fs.unlinkSync(
      path.resolve(__dirname, '..', '..', '..', 'temp', `${pet.image}`)
    );

    res.status(200).send();
  }

  async showAllbyLocationAndQueryParams(req, res) {
    const { uf, city, category, size, age } = req.query;

    const pets = await db('pets')
      .join('users', 'pets.uuid_user', 'users.uuid')
      .where('pets.age', Number(age))
      .where({ uf, city, category, size })
      .select([
        { uuid_pet: 'pets.uuid' },
        'image',
        { name_pet: 'pets.name' },
        { category_pet: 'pets.category' },
        { size_pet: 'pets.size' },
        { age_pet: 'pets.age' },
        { ower: 'users.name' },
        'email',
        'whatsapp',
      ]);

    res.json(pets);
  }
}

export default PetsController;
