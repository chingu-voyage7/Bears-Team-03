const jwt = require('jsonwebtoken');
const configVars = require('../../config/keys.js');

module.exports = (req, res, next) => {
  try {
    req.userData = jwt.verify(req.headers.authorization, configVars.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ fail: { message: 'Unauthorized' } });
  }
};
