const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/applications', indexRouter);

// The 404 Route
app.get('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Requested resource not found',
    });
});

module.exports = app;
