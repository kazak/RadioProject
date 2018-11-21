"use strict";

/**
 * Module dependencies.
 */
const app       = require('../app');
const config    = require('../config');
const cpuCount  = require('os').cpus().length;
const cluster   = require('cluster');

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || config.default_port);

// Start clasters
if (cluster.isMaster) {

    for (let i = 0; i < cpuCount; i += 1) {
        cluster.schedulingPolicy = cluster.SCHED_NONE;
        cluster.fork();
        console.log(`process start on port:${port}`);
    }

    cluster.on('exit', function (worker) {
        console.log(`Worker #${worker.id} died :(`);
        cluster.fork();
    });

    cluster.on('disconnect', (worker) => {
        console.log(`The worker #${worker.id} has disconnected`);
    });

} else {

    /**
     * Create server.
     */
    app.listen(port, () => {
        console.error(`Connect server is started on port ${port}`);
    });

    console.log(`I'm claster #${cluster.worker.id}`);
}

process.on('uncaughtException', (err) => {
    console.log(err.message);
    process.exit(1);
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
