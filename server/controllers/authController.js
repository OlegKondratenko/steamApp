const express = require('express');
const router = new express.Router();
const {
    registration,
    signIn,
} = require('../services/authService');
const {
    asyncWrapper,
} = require('../utils/apiUtils');
const RESDELAY = 3000;

router.post('/register', asyncWrapper(async(req, res, next) => {
    const {
        username,
        password,
        role,
    } = req.body;
    try {
        await registration({
            username,
            password,
            role,
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
router.post('/login', asyncWrapper(async(req, res, next) => {
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
            token,
            message: 'Successfully signed in',
        });
    }, RESDELAY);
}));
module.exports = {
    authRouter: router,
};