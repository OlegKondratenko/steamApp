const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const { authRouter } = require("./server/controllers/authController");
const { usersRouter } = require("./server/controllers/usersController");
const { AuthMiddleware } = require("./server/middlewares/AuthMiddleware");
const { gamesRouter } = require("./server/controllers/gamesController");
const { libraryRouter } = require("./server/controllers/libraryController");
const { friendRouter } = require("./server/controllers/friendsController");
const {
  getFriends,
  getAllUsers,
  declineFriendRequest,
  deleteFriend,
  sendFriendReq,
  acceptFriendReq,
} = require("./server/services/friendsService");
const { UserModel } = require("./server/models/userModel");
const PORT = 4300;

app.use(cors());
app.use(express.json({ extended: true }));
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/dist/steam-app")));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/dist/steam-app/index.html"));
});

app.use("/api/auth", authRouter);
app.use("/api/games", gamesRouter);
app.use("/api/users/me", [AuthMiddleware], usersRouter);
app.use("/api/library", [AuthMiddleware], libraryRouter);
app.use("/api/friends", [AuthMiddleware], friendRouter);

app.use((err, req, res, next) => {
  if (!err.message) {
    switch (err.status) {
      case 403:
        err.message = "U have no access to this page";
        break;
      case 401:
        err.message = "Please login to take access";
        break;
      case 400:
        err.message = "Something went wrong";
        break;
      default:
        break;
    }
  }
  res.status(err.status || 500).json({
    message: err.message || "server error",
  });
});


io.use(function (socket, next) {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(
      socket.handshake.query.token,
      process.env.JWT_KEY,
      function (err, decoded) {
        if (err) return next(new Error("Authentication error"));
        socket.decoded = decoded;
        next();
      }
    );
  } else {
    next(new Error("Authentication error"));
  }
}).on("connection", async function (socket) {
  const userId = socket.decoded._id;
  let friends = await getFriends(userId);
  let users = await getAllUsers({ userId });
  socket.emit("init", { friends: { ...friends }, users: users });

  socket.on("searchUsers", async function ({ name }) {
    users = await getAllUsers({ userId, name });
    socket.emit("init", { friends: { ...friends }, users: users });
  });

  socket.on("init", async function () {
    let user = await UserModel.findOne({ _id: userId })
    friends = await getFriends(userId);
    socket.emit("init", { friends: { ...friends }, users: users });
  });

  socket.on("sendFriendReq", async function (friendId) {
    await sendFriendReq({ userId, friendId });
    friends = await getFriends(userId);
    socket.emit("friendsChanged", { ...friends });
  });

  socket.on("acceptFriendReq", async function (friendId) {
    await acceptFriendReq({ userId, friendId });
    friends = await getFriends(userId);
    socket.emit("friendsChanged", { ...friends });
  });

  socket.on("rejectFriendReq", async function (friendId) {
    await declineFriendRequest({ userId, friendId });
    friends = await getFriends(userId);
    socket.emit("friendsChanged", { ...friends });
  });

  socket.on("deleteFriendReq", async function (friendId) {
    await deleteFriend({ userId, friendId });
    friends = await getFriends(userId);
    socket.emit("friendsChanged", { ...friends });
  });
});

const startApp = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Oleh1:12345@cluster0.1pnci.mongodb.net/finalProj",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    // app.listen(PORT, () => {
    //   console.log(`Example app listening at http://localhost:${PORT}`);
    // });

    http.listen(process.env.PORT || 4300, function () {
      console.log(`listening on http://localhost:${process.env.PORT || 4300}`);
    });
  } catch (err) {
    console.error(`Error on server startup: ${err.message}`);
  }
};
startApp();

module.exports = app;
