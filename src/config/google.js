const passport = require("passport");
const User = require("../user/user.model");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.CALLBACK_URL,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("used strategy", profile);
      const id = profile.id;
      const email = profile.emails[0].value;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;
      const profilePhoto = profile.photos[0].value;
      const source = "google";

      const currentUser = await User.findOne({ id: profile.id, source: "google" });
      if (currentUser) {
        // already have the user -> return (login)
        currentUser.lastVisited = new Date();
        return done(null, currentUser);
      } else {
        // register user and return
        const newUser = await new User({
          id,
          email,
          firstName,
          lastName,
          profilePhoto,
          source,
        }).save();
        return done(null, newUser);
      }
    }
  )
);
