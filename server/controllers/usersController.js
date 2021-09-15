const express = require('express');
const router = new express.Router();
const {
  asyncWrapper,
} = require('../utils/apiUtils');
const {
  getUserProfileInfo,
  deleteUserProfile,
  changeUserPass,
} = require('../services/userProfileService');


router.get('/', asyncWrapper(async (req, res, next) => {
  const userId = req.user._id;
  const userInfo = await getUserProfileInfo(userId);
  res.status(200).json({
    ...userInfo,
  });
}));
router.delete('/', asyncWrapper(async (req, res, next) => {
  const userId = req.user._id;
  await deleteUserProfile(userId);
  res.status(200).json({
    message: 'account deleted',
  });
}));

router.patch('/password', asyncWrapper(async (req, res, next) => {
  const userId = req.user._id;
  const {
    oldPassword, newPassword,
  } = req.body;
  await changeUserPass(userId, oldPassword, newPassword);
  res.status(200).json({
    message: 'password changed',
  });
}));


module.exports = {
  usersRouter: router,
};