var Config;
Config = require('./server/config');

const app = require('express')();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', 'https://shopifyeventlogs.web.app');


    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Require our routes into the application.
router = require('./server/routes')(app);

const port = parseInt(process.env.PORT, 10) || Config.server.port;
app.set('port', port);

fs = require('fs');

var http = require('http');
var server = http.createServer(app);

server.listen(port);
console.log("server listening to port: ", port);
module.exports = app;