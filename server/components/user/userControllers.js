const User = require('./userModel');
// These are the functions executed when you reach the requested endpoint

exports.userTestRoute = (req, res) => {
  res.status(200).json({ message: 'You reached the test route, gj!' });
};

exports.userGetAll = (req, res) => {
  User.find({})
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ fail: err }));
};

exports.userGetByID = (req, res) => {
  User.find({ _id: req.userData.id })
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ fail: { message: 'User not found!' } });
      }
    })
    .catch(err => res.status(500).json({ fail: err }));
};

exports.userUpdateByID = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.userData.id },
    { $set: req.body },
    { new: true, runValidators: true },
  )
    .then(updatedUser => res.status(200).json(updatedUser))
    .catch(err => res.status(500).json({ fail: err }));
};

exports.userDeleteByID = (req, res) => {
  User.findOneAndDelete({ _id: req.userData.id })
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({ fail: err }));
};
