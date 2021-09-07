const express = require('express');
const { AuthMiddleware } = require('../middlewares/AuthMiddleware');
const router = new express.Router();

const {
    registration,
    signIn,
    setUserProfileInfo,
} = require('../services/authService');

const {
    asyncWrapper,
} = require('../utils/apiUtils');
const RESDELAY = 0;

router.post('/register', asyncWrapper(async (req, res, next) => {
    const {
        username,
        password,
    } = req.body;
    try {
        await registration({
            username,
            password,
        });
    } catch (error) {
        const err = new Error(error.message);
        err.status = 400;
        throw err;
    }
    res.status(200).json({
        message: 'Successfully registered',

    });
}));
router.post('/login', asyncWrapper(async (req, res, next) => {
    const {
        username,
        password,
    } = req.body;
    const token = await signIn({
        username,
        password,
    });
    await setTimeout(() => {
        res.status(200).json({
            username,
            token,
            message: 'Successfully signed in',
        });
    }, RESDELAY);
}));

router.put('/profile', [AuthMiddleware], asyncWrapper(async (req, res, next) => {
    const userId = req.user._id;
    const { username, age, email } = req.body
    await setUserProfileInfo({ username, age, email, userId })
    res.status(200).json({ message: 'user Info updated' })
}));
module.exports = {
    authRouter: router,
};