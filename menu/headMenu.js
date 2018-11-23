"use strict";

const menu = {
    home: {
        url: '/',
        title: 'Home'
    },
    music: {
        url: '/music',
        title: 'Music'
    },
    download: {
        url: '/download',
        title: 'Download'
    }
};

let link_auth = (auth) => {
    return auth ? {
        url: '/user',
        title: 'profile ' + auth
    } : {
        url: '/login',
        title: 'Login'
    };
};

module.exports = (step, auth) => {
    let response = [];

    for (const key in menu) {
        if (step != key) response.push(menu[key]);
    }

    response.push(link_auth(auth));

    return response;
};
