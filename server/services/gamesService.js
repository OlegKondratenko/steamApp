const { GameModel } = require('../models/gamesModel');
const { UserModel } = require('../models/userModel');

const getGamesList = async ({ price = 10000, name, genres }, limit) => {
    limit = limit && limit > 20 ? 20 : limit
    let query = {}
    if (name) {
        let nameReg = new RegExp(`.*${name}.*`, 'i')
        query.title = { $regex: nameReg };
    }
    if (price || price == 0) {
        price = Number(price)
        query.price = { $lt: price };
    }
    if (genres && genres.length > 0) {
        genres = genres.split(' ').map(str => str.replace(/\b\w/g, l => l.toUpperCase()));
        query.genres = { $all: genres };
    }
    let games = await GameModel.find(query).limit(20)
    return games
}

const addGameToUser = async ({ gameId, userId }) => {
    const user = await UserModel.findOne({ _id: userId })
    const game = await GameModel.findOne({ _id: gameId })
    user.library.push(game._id)
    await user.save()
}

module.exports = {
    getGamesList,
    addGameToUser
}