require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const passport = require("passport");
var session = require("express-session");

require("./src/user/user.model");
require("./src/config/passport");

const mongodbUri = process.env.MONGO_URI;

mongoose.connect(
  mongodbUri,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (error) => {
    if (error) console.log(error);
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("html", require("ejs").renderFile);
app.use(express.static(__dirname + "/public"));

app.use(cookieParser());
app.use(
  session({
    secret: "secr3t",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

app.get("/", (req, res) => {
  res.render("index.ejs", { message: req.flash("success") }); //success is where passport.js saves the flash message
});

app.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile.ejs", { user: req.user });
});

app.get("/failed", (req, res) => {
  res.render("index.ejs", { message: req.flash("error") });
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
    successRedirect: "/profile",
    failureFlash: true,
    successFlash: "Successfully logged in!",
  }),
  (req, res) => {
    res.send("Successfully logged in");
  }
);

app.get("/auth/logout", (req, res) => {
  req.flash("success", "Successfully logged out");
  req.session.destroy(function() {
    res.clearCookie('connect.sid');
    res.redirect("/");
});
});

app.listen(3000, function () {
  console.log("SaaSBase Authentication Server listening on port 3000");
});
