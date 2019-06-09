const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.validate = (req, res, next) => {
  req.checkBody('email').notEmpty();
  req.checkBody('email', 'Email is must be valid.').isEmail();
  req.checkBody('password', 'Password is required.').notEmpty();
  req.checkBody('password_confirm', 'Confirmed Password is required').notEmpty();
  req.checkBody('password_confirm', 'Passwords do not match.').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).json(errors);
  }

  next();
}

exports.create = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send({
    message: 'Email has already been taken'
  });

  user = await new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).save();

  user.password = undefined;

  res.send(user);
}

exports.show = async (req, res) => {
  req.user.password = undefined;

  res.send(req.user);
}