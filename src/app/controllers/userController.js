import fs from 'fs';
import path from 'path';
import AppError from '../../errors/AppError';
import db from '../../database';
import generateUuid from '../../utils/generateUuid';
import generateHashPassword, {
  verifyPassword,
} from '../../utils/passwordCrypt';

class useController {
  async index(req, res) {
    const { limit, page } = req.query;

    const [{ count }] = await db('users').count('uuid');

    const totalPages = Math.floor(count / limit);

    if (count <= limit || totalPages === 0) {
      const users = await db('users').select('*');
      users.forEach((user) => {
        delete user.password;
      });

      return res.json(users);
    }

    if (page > totalPages) {
      throw new AppError('exceeded the page limit');
    }

    try {
      const users = await db('users')
        .limit(limit)
        .offset((page - 1) * limit);
      delete users.password;
      return res.json({ totalPages, users });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async create(req, res) {
    const { name, email, password, age, whatsapp, uf, city } = req.body;

    const uuid = await generateUuid();

    const user = await db('users').where({ email });

    if (user.length !== 0) throw new AppError('User already exists');

    const hash = await generateHashPassword(password);

    try {
      const userUuid = await db('users')
        .insert({
          uuid,
          name,
          email,
          password: hash,
          age,
          whatsapp,
          uf,
          city,
        })
        .returning('uuid');

      res.status(201).json({ userUuid });
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }

  async update(req, res) {
    const { name, email, password, age, whatsapp, uf, city } = req.body;
    const { uuid_user: id_user } = req;

    const user = await db('users').where({ uuid: id_user }).first();

    if (!user) throw new AppError('User not found');

    const userEmailExist = await db('users')
      .whereNot({ uuid: id_user })
      .where({ email })
      .first();

    if (userEmailExist) {
      throw new AppError('E-mail already registered');
    }

    const hash = await generateHashPassword(password);

    await db('users').where({ uuid: id_user }).update({
      name,
      email,
      password: hash,
      age,
      whatsapp,
      uf,
      city,
    });

    res.status(200).send();
  }

  async delete(req, res) {
    const { password } = req.body;
    const { uuid_user: id_user } = req;

    const user = await db('users').where({ uuid: id_user }).first();

    if (!user) throw new AppError('User not found');

    const key = await verifyPassword(password, user.password);

    if (key === false) throw new AppError('Password invalid', 406);

    const images = await db('pets')
      .where('pets.uuid_user', user.uuid)
      .select('image');

    !!images &&
      images.forEach(({ image }) =>
        fs.unlinkSync(
          path.resolve(__dirname, '..', '..', '..', 'temp', `${image}`)
        )
      );

    await db('users').where({ uuid: id_user }).del();
    res.status(200).send();
  }
}

export default useController;
