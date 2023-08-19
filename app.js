require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var jokiRouter = require('./routes/joki');
var InfoRouter = require('./routes/information');
var HeroRouter = require('./routes/hero');
var GameRouter = require('./routes/game');

var app = express();


app.use(cors({
    origin: true
  }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', usersRouter);
app.use('/joki', jokiRouter); 
app.use('/info', InfoRouter);
app.use('/hero', HeroRouter);
app.use('/game', GameRouter);

module.exports = app;
