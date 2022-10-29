import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.post(
  '/createuser',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    console.log('submitted data: ' + user);

    if (!user) {
      await User.create({
        name: req.body.email,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false,
      });
      return;
    }

    // res.status(401).send({message: 'Invalid email or password'});
    console.log('res: ' + JSON.stringify(res));
})
);

export default userRouter;