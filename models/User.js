const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: '../config/config.env' });

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
  isAdmin: {
    type: Boolean,
    default: false,
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
});

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

//sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  //access to  user's Id
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model('User', UserSchema);

UserSchema.statics.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT_SECRET);
    const user = User.findById(id);
    return user;
  } catch (e) {
    console.error(e);
  }
};
module.exports = User;
