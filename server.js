const express = require('express');
const router = require('./router.js');
const server = express();

server.use(express.json());
server.use(router);

server.get('/', (req, res) => {
  res.send('<h1>web db challenge</h1>')
})

module.exports = server;