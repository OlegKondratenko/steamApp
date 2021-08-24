const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  UserModel,
} = require('../models/userModel');

const registration = async ({
  username,
  password,
  role,
}) => {
  const user = new UserModel({
    username,
    password: await bcrypt.hash(password, 10),
    role,
  });
  await user.save();
};

const signIn = async ({
  username,
  password,
}) => {
  const user = await UserModel.findOne({
    username,
  });

  if (!user) {
    const err = new Error('Incorrect login or password');
    err.status = 400;
    throw err;
  }
  if (!(await bcrypt.compare(password, user.password))) {
    const err = new Error('Incorrect login or password');
    err.status = 401;
    throw err;
  }
  console.log('tokeasdasdasdfasd', user.role);
  const token = jwt.sign({
    _id: user._id,
    role: user.role,
    username: user.username,
    iat: 7776000,
  }, process.env.JWT_KEY);
  return token;
};
module.exports = {
  registration,
  signIn,
};