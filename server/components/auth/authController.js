const jwt = require('jsonwebtoken');
const configVars = require('../../config/keys');
const User = require('../user/userModel');

exports.loginUser = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user && user.validPassword(req.body.password)) {
      /* eslint-disable-next-line */
      const token = jwt.sign({ id: user._id }, configVars.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).send(token);
    } else {
      res.status(401).send({ fail: { message: 'Login failed' } });
    }
  });
};
