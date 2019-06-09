const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');

exports.validate = (req, res, next) => {
  req.checkBody('email', 'Email is required.').notEmpty();
  req.checkBody('password', 'Password is required.').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).json(errors);
  }

  next();
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(404).send({
    message: 'Incorrect email or password'
  });

  const isMatched = await bcrypt.compare(req.body.password, user.password);

  if (isMatched) {
    const token = await user.generateToken();

    res.json({
      success: true,
      token: `Bearer ${token}`
    });
  } else {
    return res.status(404).send({
      message: 'Incorrect email or password'
    });
  }
};
