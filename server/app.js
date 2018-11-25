const express = require('express');

const app = express();

const usersRoutes = require('./components/users/usersRoutes');

// Standard middleware that convert incoming request data ( if formatted as json)
// and put it into the req.body property
app.use(express.json());

// Appending user routes using a common identifier ( ... /users/...)
app.use('/users', usersRoutes);

// Main route for testing purpose
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Get our from my main route!' });
});

module.exports = app;
