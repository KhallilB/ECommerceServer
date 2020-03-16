const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ]
  },
  password: {
    type: String,
    trim: true,
    required: true,
    /*
        The string must contain at least 1 lowercase alphabetical character
        The string must contain at least 1 uppercase alphabetical character
        The string must contain at least 1 numeric character
        The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
        The string must be fourteen characters or longer
    */
    match: [
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{14,})/
    ]
  },
  admin: {
    type: Boolean,
    default: false
  }
});
