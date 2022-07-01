const jwt = require('jsonwebtoken');

const config = process.env;

/**
 * This middleware function takes in token via the request body, a request query, or within the request headers,
 * then it checks the token to assure it matches to a user in the database. If it successfully matches then it
 * returns a next() function allowing the request to go through within the API.
 */
const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res
      .status(403)
      .json({ success: false, msg: 'A token is required for authentication' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded; // Stores user object in request
  } catch (err) {
    console.error(err);
    return res.status(401).json({ success: false, msg: 'Invalid Token' });
  }

  return next();
};

module.exports = verifyToken;
