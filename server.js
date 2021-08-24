let express = require('express');
let path = require('path');
let app = express();

const {authRouter} = require('./server/controllers/authController');
const {AuthMiddleware} = require('./server/middlewares/AuthMiddleware');
const mongoose = require('mongoose');

app.use(express.json({extended: true}));
app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, '/dist/steam-app')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/steam-app/index.html'))
})

app.use('/api/auth', authRouter);
app.use('/api/users/me', [AuthMiddleware], usersRouter);

app.use((err, req, res, next) => {
  if (!err.message) {
    switch (err.status) {
      case 403:
        err.message = 'U have no access to this page';
        break;
      case 401:
        err.message = 'Please login to take access';
        break;
      case 400:
        err.message = 'Something went wrong';
        break;
      default:
        break;
    }
  };
  res.status(err.status || 500).json({
    'message': err.message || 'server error',
  });
});

const startApp = async () => {
  try {
    await mongoose.set('useCreateIndex', true);
    await mongoose.connect('mongodb+srv://Oleh:12345@cluster0.1pnci.mongodb.net/HW3', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`Example app listening at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(`Error on server startup: ${err.message}`);
  }
};
startApp();

app.listen(process.env.PORT || 8080)

module.exports = app;





