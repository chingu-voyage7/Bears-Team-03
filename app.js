const express = require('express');
const path = require('path');

const app = express();

const userRoutes = require('./components/user/userRoutes');
const businessRoutes = require('./components/business/businessRoutes');
const projectRoutes = require('./components/project/projectRoutes');
const authRoutes = require('./components/auth/authRoutes');
const {prepopulate} = require('./components/dummy-data');
// Standard middleware that convert incoming request data ( if formatted as json)
// and put it into the req.body property
app.use(express.json());

// Appending user routes using a common identifier ( ... /users/...)
app.use('/user', userRoutes);
app.use('/business', businessRoutes);
app.use('/project', projectRoutes);
app.use(authRoutes);
app.use('/pre-populate', prepopulate);
// Priority serve any static files.
app.use(express.static(path.join(__dirname, 'client', 'build')));

// // Main route for testing purpose
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Get our from my main route!' });
// });

// All remaining requests return the React app, so it can handle routing.
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

module.exports = app;
