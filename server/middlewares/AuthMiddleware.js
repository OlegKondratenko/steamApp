const jwt = require('jsonwebtoken');
require('dotenv').config();

const AuthMiddleware = (req, res, next) => {
  const {
    authorization,
  } = req.headers;
  if (!authorization) {
    const err = new Error;
    err.status = 401;
    throw err;
  }
  const [, token] = authorization.split(' ');

  if (!token) {
    const err = new Error;
    err.status = 403;
    throw err;
  }
  try {
    const tokenPayload = jwt.verify(token, process.env.JWT_KEY);
    req.user = {
      _id: tokenPayload._id,
      username: tokenPayload.username,
    };
    next();
  } catch (err) {
    const cliErr = new Error(err.message);
    cliErr.status = 400;
    throw cliErr;
  }
};
module.exports = {
  AuthMiddleware,
};