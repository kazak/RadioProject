
"use strict";

const express       = require('express');
const favicon       = require('express-favicon');
const cookie        = require('cookie-parser');
const config        = require('./config');
const bodyParser    = require('body-parser');

const app           = express();

/**
 * Config express
 */

// Set view
app.set('views', config.views_path);
app.set('view engine', config.view_engine);

// Set static folder
app.use('/public', express.static(config.public_dir));
app.use(cookie(config.cookies.key));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// todo: whay not work???
app.use(favicon(config.favicon_path));

// Routing
app.use('/', require('./routes/index'));

// Catch 404 and forward to error handler
app.use((req, res, next) => {

    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use((err, req, res, next) => {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
