const express = require('express');

const app = express();

const userRoutes = require('./components/user/userRoutes');
const businessRoutes = require('./components/business/businessRoutes');
const projectRoutes = require('./components/project/projectRoutes');
const authRoutes = require('./components/auth/authRoutes');

// Standard middleware that convert incoming request data ( if formatted as json)
// and put it into the req.body property
app.use(express.json());

// Appending user routes using a common identifier ( ... /users/...)
app.use('/user', userRoutes);
app.use('/business', businessRoutes);
app.use('/project', projectRoutes);
app.use(authRoutes);

// Main route for testing purpose
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Get our from my main route!' });
});

module.exports = app;
