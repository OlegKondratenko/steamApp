const mongoose = require("mongoose");
const { type } = require("os");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now(),
  },
  library: [mongoose.Schema.Types.ObjectId],
  age: {
    type: Number,
  },
  email: {
    type: String,
  },
  sentRequest: [
    {
      friendId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
      friendName: { type: String, default: "" },
    },
  ],
  request: [
    {
      friendId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
      friendName: { type: String, default: "" },
    },
  ],
  friendsList: [
    {
      friendId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
      friendName: { type: String, default: "" },
    },
  ],
});

const UserModel = mongoose.model("Users", userSchema);

module.exports = {
  UserModel,
};
