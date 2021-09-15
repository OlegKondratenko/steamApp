const express = require('express');
const router = new express.Router();
const {
    asyncWrapper,
} = require('../utils/apiUtils');
const {
    getGamesList, addGameToUser
} = require('../services/gamesService');
const { AuthMiddleware } = require('../middlewares/AuthMiddleware');


router.get('/', asyncWrapper(async (req, res, next) => {
    const { price, name, genres } = req.query
    const games = await getGamesList({ price, name, genres });
    res.status(200).json(games)
}));
router.put('/:id', [AuthMiddleware], asyncWrapper(async (req, res, next) => {
    const userId = req.user._id;
    const gameId = req.params.id
    await addGameToUser({ gameId, userId })
    res.status(200).json('game was added to your library')
}));

module.exports = {
    gamesRouter: router,
};