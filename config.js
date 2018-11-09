"use strict";

const path      = require('path');
const config    = {
    views_path:     path.join(__dirname, 'views'),
    view_engine:    'jade',
    favicon_path:   path.join(__dirname, 'public', 'images', 'icons', 'favicon.ico'),
    default_port:   '3000',
    cookies: {
        key: ["eklnfcjhbsSecretrfcrKey"]
    },
    public_dir: path.join(__dirname, 'public'),
    admin: {
        login: 'admin',
        pass: '1234'
    }
};

module.exports = config;
