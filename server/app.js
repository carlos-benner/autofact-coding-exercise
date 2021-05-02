var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv/config');
require('./database');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var formsRouter = require('./routes/forms');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/forms', formsRouter);

module.exports = app;