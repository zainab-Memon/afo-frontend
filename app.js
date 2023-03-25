const compression = require('compression')
const express = require('express');
const http = require('http');
const https = require('https');
const path = require('path');
const fs = require("fs");

const app = express()
app.use(compression())

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/build'));
// app.use(express.static(__dirname + '/build/sm-web-booking'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app)
// Start the app by listening on the default Heroku port
server.listen(port, () => console.log('Running...'));