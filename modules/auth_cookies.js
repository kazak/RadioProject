"use strict";

const config = require('../config');

exports.checkoAuth = (req, res, next) => {
    res.app.locals.auth = true;
    next();
};

exports.setAuth = (req, res, next) => {
    res.cookie('auth', req.body.login, { signed: true });
    if (req.body.login == config.admin.login && req.body.pass == config.admin.pass) {
        res.app.locals.admin = true;
    }
    res.app.locals.auth = req.body;
    next();
};
