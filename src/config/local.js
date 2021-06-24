const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require("../user/user.model");
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
  async function (email, password, done) {
    const currentUser = await UserService.getUserByEmail({ email })

    if (!currentUser) {
      return done(null, false, { message: `User with email ${email} does not exist` });
    }

    if (currentUser.source != "local") {
      //return error
      return done(null, false, { message: `You have previously signed up with a different signin method` });
    }

    if (!bcrypt.compareSync(password, currentUser.password)) {
      return done(null, false, { message: `Incorrect password provided` });
    }
    return done(null, user);
  }
));