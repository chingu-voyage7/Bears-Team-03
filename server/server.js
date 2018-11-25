/* eslint-disable no-console */
const http = require('http');

const configVars = require('./config/keys');
const app = require('./app');

const port = configVars.PORT;

http.createServer(app).listen(port, () => console.log(`Server listening on port ${port}`));
