const rest_jwt = require('restify-jwt-community');
const restify = require("restify");
const Logger = require('bunyan');
const restifyBunyanLogger = require('restify-bunyan-logger');
const constants = require('./src/constants');
const name = 'picklerick';
const log = new Logger({name});
const server = restify.createServer({name, log});
server.on('after', restifyBunyanLogger());
// If you want to intercept before each call
server.use(function (req, res, next) {
  console.info('IN: server.use');
  return next();
});

// we need both queryParam & bodyParser plugins
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
require('./src/socket')(server);
require('./src/handlers')(server);

// pre allows us to be notified before each REST call
server.pre(function (req, res, next) {
  console.log(`IN: server.pre [${req.getPath()}]`);
  next();
});

// Applying JWT here protects all routes except the token path
server.use(rest_jwt({secret: constants.SECRET}).unless({path: ['/token']}));

server.listen(constants.PORT, () => {
  console.info(`${server.name} listening at: ${server.url}`);
});
