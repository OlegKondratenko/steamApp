const { GameModel } = require("../models/gamesModel")
const { UserModel } = require("../models/userModel")

const getUserLibrary = async (userId) => {
    const user = await UserModel.findOne({ _id: userId })
    const games = await GameModel.find({ _id: { $in: user.library } })
    return games
}

module.exports = {
    getUserLibrary
}