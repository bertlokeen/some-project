const JwtStrategy = require('passport').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
};

module.exports = passport => {
  passport.use('Login Strategy',
    new JwtStrategy(opts, async (payload, done) => {
      const user = await User.findById(payload.id);

      if (user) return done(null, user);

      return done(null, false);
    })
  );
}
