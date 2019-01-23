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
          passwordHash: req.body.password,
          adult: req.body.adult,
          gender: req.body.gender,
          //addressData: req.body.addressData,
          address: req.body.address,
          city: req.body.city,
          country: req.body.country,
          stateOrProvince: req.body.stateOrProvince,
          zipCode: req.body.zipCode,
          // timeAvailability: req.body.timeAvailability,
          timeAvailability: req.body.hours,
          phone: req.body.phone,
          volunteerField: req.body.volunteerField,
        });
        newUser
          .save()
          .then(userCreated => res.status(201).json(userCreated))
          .catch(err => res.status(500).json({ fail: err.message }));
      }
    })
    .catch(err => res.status(500).json({ fail: err.message }));
};

exports.userGetAll = (req, res) => {
  User.find({})
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ fail: err.message }));
};

exports.userGetByID = (req, res) => {
  User.findOne({ _id: req.userData.id })
    .then((currentUser) => {
      if (currentUser) {
        res.status(200).send({ currentUser });
      } else {
        res.status(404).json({ fail: { message: 'User not found!' } });
      }
    })
    .catch(err => res.status(500).json({ fail: err.message }));
};

exports.userUpdateByID = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.userData.id },
    { $set: req.body },
    { new: true, runValidators: true },
  )
    .then(updatedUser => res.status(200).json(updatedUser))
    .catch(err => res.status(500).json({ fail: err.message }));
};

exports.userDeleteByID = (req, res) => {
  User.findOneAndDelete({ _id: req.userData.id })
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({ fail: err.message }));
};
