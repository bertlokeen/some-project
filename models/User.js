const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email :{
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid email address'],
    required: 'Email is required'
  },
  password: {
    type: String,
    min: 5,
    max: 50,
    required: 'Password is required'
  },
  name: {
    type: String,
    required: 'Name is required',
    minlength: 2,
    maxlength: 50
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.generateToken = async function(next) {
  const payload = {
    id: this._id,
    email: this.email
  };

  const token = await jwt.sign(payload, process.env.SECRET, {
    expiresIn: 36000
  });

  return token;
};

module.exports = new mongoose.model('User', UserSchema);