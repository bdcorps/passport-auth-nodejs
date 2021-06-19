const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require("../user/user.model");
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
  async function (email, password, done) {
    User.findOne({ email, source: "local" }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: `User with email ${email} does not exist` });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: `Incorrect password provided` });
      }
      return done(null, user);
    });
  }
));