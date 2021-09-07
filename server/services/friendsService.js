const { UserModel } = require('../models/userModel');

const getFriends = async (userId) => {
    const user = await UserModel.findOne({ _id: userId })
    return { friends: user.friendsList, reqSentTo: user.sentRequest, reqReseivedFrom: user.request }
}

const getAllUsers = async ({ userId, name = '' }) => {
    let query = {}
    if (name) {
        let nameReg = new RegExp(`.*${name}.*`, 'i')
        query.username = { $regex: nameReg };
    }
    const friends = await getFriends(userId);
    const allFriends = [].concat(friends.friends, friends.reqSentTo, friends.reqReseivedFrom, userId).map(user => user.friendId)
    query._id = { $nin: [...allFriends] }
    const users = await UserModel.find(query).limit(30)
    return users.map(u => ({ friendName: u.username, friendId: u._id }))
}
const sendFriendReq = async ({ userId, friendId }) => {
    if (userId === friendId) {
        return
    }
    const user = await UserModel.findOne({ _id: userId })
    const possibleFriend = await UserModel.findOne({ _id: friendId })
    if (user.friendsList.some(el => String(el.friendId) === String(friendId))) {
        return
    }
    if (user.request.some(el => String(el.friendId) === String(friendId))) {
        return
    }
    if (user.sentRequest.some(el => String(el.friendId) === String(friendId))) {
        return
    }
    user.sentRequest.push({ friendId: possibleFriend._id, friendName: possibleFriend.username })
    possibleFriend.request.push({ friendId: user._id, friendName: user.username })
    await user.save()
    await possibleFriend.save()
}
const acceptFriendReq = async ({ userId, friendId }) => {
    if (userId === friendId) {
        return
    }

    const user = await UserModel.findOne({ _id: userId })
    const friend = await UserModel.findOne({ _id: friendId })

    if (user.friendsList.some(el => String(el.friendId) === String(friendId))) {
        return
    }

    friend.sentRequest = friend.sentRequest.filter(req => String(req.friendId) !== String(user._id))
    user.request = user.request.filter(req => String(req.friendId) !== String(friend._id))

    user.friendsList.push({ friendId: friend._id, friendName: friend.username })
    friend.friendsList.push({ friendId: user._id, friendName: user.username })

    await user.save()
    await friend.save()
}
const declineFriendRequest = async ({ userId, friendId }) => {

    const user = await UserModel.findOne({ _id: userId })
    const friend = await UserModel.findOne({ _id: friendId })

    user.request = user.request.filter(req => String(req.friendId) !== String(friend._id))
    friend.sentRequest = friend.sentRequest.filter(req => String(req.friendId) !== String(user._id))

    await user.save()
    await friend.save()
}
const deleteFriend = async ({ userId, friendId }) => {

    const user = await UserModel.findOne({ _id: userId })
    const friend = await UserModel.findOne({ _id: friendId })

    user.friendsList = user.friendsList.filter(req => String(req.friendId) !== String(friend._id))
    friend.friendsList = friend.friendsList.filter(req => String(req.friendId) !== String(user._id))
    await user.save()
    await friend.save()
}



module.exports = {
    getFriends,
    sendFriendReq,
    acceptFriendReq,
    getAllUsers,
    declineFriendRequest,
    deleteFriend
}