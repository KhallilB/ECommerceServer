const express = require('express');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
