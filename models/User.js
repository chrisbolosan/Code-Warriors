const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'User must have username'],
    maxLength: [20, 'Name can not be more than 20 characters'],
  },
  email: {
    type: String,
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      'Please add a valid email',
    ],
    required: [true, 'User must have an email'],
  },
  password: {
    type: String,
    required: [true, 'User must have a password'],
    minLength: [8, 'Password must have at least 8 characters`'],
  },
  rank: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Master'],
    default: 'Beginner',
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
