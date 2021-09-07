const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {
  UserModel,
} = require('../models/userModel');

const registration = async ({
  username,
  password,
}) => {
  const user = new UserModel({
    username,
    password: await bcrypt.hash(password, 10),
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
  const token = jwt.sign({
    _id: user._id,
    username: user.username,
    iat: 7776000,
  }, process.env.JWT_KEY);
  return token;
};

const setUserProfileInfo = async ({ username, age, email, userId }) => {
  const user = await UserModel.findOne({ _id: userId })
  user.age = Number(age)
  user.email = email
  user.username = username
  await user.save()
}

module.exports = {
  registration,
  signIn,
  setUserProfileInfo,
};