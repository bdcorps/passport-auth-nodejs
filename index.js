var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var app = express();

app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

app.all('/', function(req, res){
  req.flash('test', 'it worked');
  res.redirect('/test')
});

app.all('/test', function(req, res){
  res.send(JSON.stringify(req.flash('test')));
});

app.listen(3000);

module.exports = app;