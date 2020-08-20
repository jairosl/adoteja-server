import AppError from "../../errors/AppError";
import db from '../../database';
import genereteUuid from "../../utils/generateUuid";
import generatePassword from "../../utils/passwordCrypt";

class useController {
  async index(req, res) {
    res.json({ hello: "world" });
  }

  async create(req, res) {
    const {
      name, email, password, age, whatsapp, uf, city,
    } = req.body;

    const uuid = await genereteUuid();

    const user = await db('users').where({ email });

    if (user.length !== 0) throw new AppError("User already exists");

    const hash = await generatePassword(password);

    try {
      const userUuid = await db('users').insert({
        uuid, name, email, password: hash, age, whatsapp, uf, city,
      }).returning("uuid");

      res.status(201).json({ userUuid });
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }
}

export default useController;
