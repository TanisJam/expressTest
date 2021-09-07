var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var cors = require('cors');

var indexRouter = require('./routes/index');
var triviaRouter = require('./routes/trivia');

var app = express();
app.use(cors());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/trivia', triviaRouter);

module.exports = app;
