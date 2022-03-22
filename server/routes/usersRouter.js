const User = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usersRouter = express.Router();

usersRouter
  .post('/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;

      if (!(username && email && password)) {
        return res.status(400).json({
          success: false,
          msg: 'You must provide all three pieces of data to register new user (email, password, username)',
        });
      }

      // Searches for existing user
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        return res.status(409).json({
          success: false,
          msg: 'User with that email already exists, please login',
        });
      }
      // Encrypts provided password
      encryptedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      // Signs new jsonwebtoken with userId and email
      const token = jwt.sign(
        { userId: user._id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: '2h',
        }
      );

      user.token = token;

      res.status(201).json({ success: true, user: user, token: user.token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  })
  .post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        return res
          .status(400)
          .json({ success: false, msg: 'Email and password are required...' });
      }

      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { userId: user._id, email },
          process.env.JWT_SECRET,
          {
            expiresIn: '2h',
          }
        );

        user.token = token;

        return res
          .status(200)
          .json({ success: true, user: user, token: user.token });
      }

      res.status(400).json({ success: false, msg: 'Invalid Creditionals' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  });

module.exports = usersRouter;
