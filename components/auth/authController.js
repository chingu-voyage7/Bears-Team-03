const jwt = require('jsonwebtoken');
const configVars = require('../../config/keys');
const User = require('../user/userModel');

exports.loginUser = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user && user.isValidPassword(req.body.password)) {
      const token = jwt.sign({ id: user._id }, configVars.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).send({token});
    } else {
      res.status(401).send({ fail: { message: 'Login failed' } });
    }
  });
};

exports.verifyToken = (req, res) => {
  try {
    let userData = jwt.verify(req.body.token, configVars.JWT_SECRET);
    User.findById(userData.id).then((user) => {
      if(user) {
        res.status(200).json(req.body.token);
      } else {
        res.status(401).json({ fail: { message: 'Unauthorized' } });
      }
    })
  } catch(error) {
    res.status(401).json({ fail: { message: 'Unauthorized' } });
  }
};