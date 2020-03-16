// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

require('dotenv').config();
require('./config/passport/index');

// Initalize
const server = express();

// Database Connection
mongoose
  .connect(process.env.DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to database');
  })
  .catch(err => {
    console.log(err);
    return err;
  });

// Middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(passport.initialize());
server.use(cors());

// Port
const port = process.env.PORT;

// Connect server
server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
