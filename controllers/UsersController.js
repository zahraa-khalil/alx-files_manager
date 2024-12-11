/* eslint-disable */
import dbClient from '../utils/db';
import sha1 from 'sha1';

class UsersController {

  static async postNew(req, res) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Missing email' });
      }

      if (!password) {
        return res.status(400).json({ error: 'Missing password' });
      }

      const userExists = await dbClient.db.collection('users').findOne({ email });

      if (userExists) {
        return res.status(400).json({ error: 'Already exists' });
      }

      const hashedPassword = sha1(password);
      const newUser = {
        email,
        password: hashedPassword,
      };

      const result = await dbClient.db.collection('users').insertOne(newUser);
      const { _id } = result.ops[0];

      await userQueue.add({ userId: _id });

      return res.status(201).json({ id: _id, email });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

};


export default UsersController;
