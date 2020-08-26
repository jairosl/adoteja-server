import AppError from '../../errors/AppError';
import db from '../../database';
import genereteUuid from '../../utils/generateUuid';
import generatePassword, { verifyPassword } from '../../utils/passwordCrypt';

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

    const uuid = await genereteUuid();

    const user = await db('users').where({ email });

    if (user.length !== 0) throw new AppError('User already exists');

    const hash = await generatePassword(password);

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
    const { id_user } = req.params;

    const user = await db('users').where({ uuid: id_user }).first();

    const userEmailExist = await db('users')
      .whereNot({ uuid: id_user })
      .where({ email });

    if (!user || userEmailExist.length >= 1) {
      throw new AppError('User not found');
    }

    const hash = await generatePassword(password);

    try {
      await db('users').where({ uuid: id_user }).update({
        name,
        email,
        password: hash,
        age,
        whatsapp,
        uf,
        city,
      });

      res.status(202).send();
    } catch (err) {
      throw new AppError(err.message, 406);
    }
  }

  async delete(req, res) {
    const { password } = req.body;
    const { id_user } = req.params;

    const user = await db('users').where({ uuid: id_user }).first();

    if (!user) throw new AppError('User not found');

    const key = await verifyPassword(password, user.password);

    if (key === false) throw new AppError('Password invalid', 406);

    try {
      await db('users').where({ uuid: id_user }).del();
      res.status(200).send();
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}

export default useController;
