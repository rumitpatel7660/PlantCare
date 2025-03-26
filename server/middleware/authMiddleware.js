const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send({ message: 'Invalid token.' });
  }
}

module.exports = auth;