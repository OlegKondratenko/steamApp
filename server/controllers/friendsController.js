const express = require('express');
const router = new express.Router();

const {
    asyncWrapper,
} = require('../utils/apiUtils');
const {
    getFriends
} = require('../services/gamesService');
const { getAllUsers } = require('../services/friendsService');
const { AuthMiddleware } = require('../middlewares/AuthMiddleware');


router.get('/', AuthMiddleware, asyncWrapper(async (req, res, next) => {
    const users = await getAllUsers();
    res.status(200).json(users)
}));


module.exports = {
    friendRouter: router,
};