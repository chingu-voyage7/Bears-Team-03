// These are the functions executed when you reach the requested endpoint

exports.userTestRoute = (req, res) => {
  res.status(200).json({ message: 'You reached the test route, gj!' });
};
