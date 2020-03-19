const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    if (
      typeof req.cookies.cellaCookie === 'undefined' ||
      req.cookies.cellaCookie === 'null'
    ) {
      req.user = null;
      res
        .send({ message: 'Authentication failed' })
        .status(401);
    } else {
      let token = req.cookies.cellaCookie;
      let decodedToken =
        jwt.decode(token, { complete: true }) || {};
      req.user = decodedToken.payload;
      console.log('User authenticated succesfully');
    }
    next();
  } catch (err) {
    console.log('Error: ', err);
    return res.send(err).status(500);
  }
};
