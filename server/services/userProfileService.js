const {UserModel} = require('../models/userModel');
const bcrypt = require('bcrypt');

const getUserProfileInfo = async (userId) => {
  const user = await UserModel.findOne({_id: userId});
  return {
    user: {
      _id: user._id,
      email: user.username,
      created_date: user.created_date,
      role: user.role.toUpperCase(),
    },
  };
};

const deleteUserProfile = async (userId) => {
  await UserModel.findOneAndDelete({_id: userId});
};

const changeUserPass = async (userId, oldPassword, newPassword) => {
  if (oldPassword === newPassword) {
    const err = new Error('new pass should be different');
    err.status = 400;
    throw err;
  }
  const user = await UserModel.findOne({_id: userId});
  if (!(await bcrypt.compare(oldPassword, user.password))) {
    const err = new Error('Old password is incorrect');
    err.status = 400;
    throw err;
  }
  await UserModel.updateOne({_id: userId},
    {$set: {password: await bcrypt.hash(newPassword, 10)}});
};


module.exports = {
  getUserProfileInfo,
  deleteUserProfile,
  changeUserPass,
};