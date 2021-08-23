let express = require('express');
let logger = require('morgan');
let path = require('path');
let app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/dist/steam-app')));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json('not found')
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
