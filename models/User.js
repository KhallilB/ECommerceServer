const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
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
      /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
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
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    ]
  },
  admin: {
    type: Boolean,
    default: false
  }
});

// Pre-save hook thatsalts and hashes User passwords save salt secret string
UserSchema.pre('save', function(next) {
  const user = this;

  // Only hash password if it has been modified or new
  if (!user.isModified('password')) return next();

  // Generate salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    // Hash the password
    // eslint-disable-next-line no-shadow
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);

      // Override password with hashed one
      user.password = hash;
      user.saltSecret = salt;
      next();
    });
  });
});

// So bcrypt doesnt compare hashed password
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
