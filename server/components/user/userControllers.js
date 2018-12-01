const User = require('./userModel');
// These are the functions executed when you reach the requested endpoint

exports.userTestRoute = (req, res) => {
  res.status(200).json({ message: 'You reached the test route, gj!' });
};

exports.userCreateOne = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.status(409).json({ fail: { message: 'Email already exists' } });
      } else {
        const newUser = new User({
          fullname: req.body.fullname,
          email: req.body.email,
          adult: req.body.adult,
          gender: req.body.gender,
          addressData: req.body.addressData,
          phone: req.body.phone,
          volunteerField: req.body.volunteerField,
          timeAvailability: req.body.timeAvailability,
        });
        newUser.setPassword(req.body.password);
        newUser
          .save()
          .then(userCreated => res.status(201).json(userCreated))
          .catch(err => res.status(500).json({ fail: err }));
      }
    })
    .catch(err => res.status(500).json({ fail: err }));
};

exports.userGetAll = (req, res) => {
  User.find({})
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ fail: err }));
};

exports.userGetByID = (req, res) => {
  User.findOne({ _id: req.userData.id })
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ fail: { message: 'User not found!' } });
      }
    })
    .catch((err) => {
      res.status(500).json({ fail: err });
    });
};

exports.userUpdateByID = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.userData.id },
    { $set: req.body },
    { new: true, runValidators: true },
  )
    .then((updatedUser) => {
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ fail: { message: 'User not found!' } });
      }
    })
    .catch(err => res.status(500).json({ fail: err }));
};

exports.userDeleteByID = (req, res) => {
  User.findOneAndDelete({ _id: req.userData.id })
    .then((userDeleted) => {
      if (userDeleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ fail: { message: 'User not found!' } });
      }
    })
    .catch(err => res.status(500).json({ fail: err }));
};
