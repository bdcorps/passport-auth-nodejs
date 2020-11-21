require("dotenv").config();

const express = require("express");
const app = express();
require("./src/user/user.model");
const bodyParser = require("body-parser");
var flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const passport = require("passport");
var session = require("express-session");

require("./src/config/passport");

const mongodbUri = process.env.MONGO_URI;
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose.connect(
  mongodbUri,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (error) => {
    if (error) console.log(error);
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("html", require("ejs").renderFile);
app.use(express.static(__dirname + "/public"));

app.use(flash());
app.use(
  session({
    secret: "secr3t",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

app.get("/", (req, res) => {
  req.flash("test", "it worked");
  res.render("index.ejs", { user: req.user, message: req.flash("success") });
});

app.get("/profile", isLoggedIn, (req, res) => {
  res.render("index.ejs");
});

app.get("/failed", (req, res) => {
  res.render("index.ejs", { user: {}, message: req.flash("error") });
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
    successRedirect: "/",
    failureFlash: true,
    successFlash: "Welcome!",
  }),
  (req, res) => {
    res.send("logged in");
  }
);

app.get("/auth/logout", (req, res) => {
  req.session.destroy();
  req.logout();
  // res.redirect("/");
  res.send("logged out");
});

app.listen(3000, function () {
  console.log("Express app listening on port 3000!");
});
