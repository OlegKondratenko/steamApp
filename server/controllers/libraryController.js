const express = require('express');
const router = new express.Router();

const {
    getUserLibrary
} = require('../services/libraryService');

const {
    asyncWrapper,
} = require('../utils/apiUtils');
const RESDELAY = 0;

router.get('/', asyncWrapper(async (req, res, next) => {
    const userId = req.user._id;
    const library = await getUserLibrary(userId);
    res.status(200).json({
        ...library,
    });
}));

module.exports = {
    libraryRouter: router,
};