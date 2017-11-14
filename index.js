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
require('./src/socket')(server);
require('./src/handlers')(server);

// we need both queryParam & bodyParser plugins
server.use(restify.plugins.queryParser({mapParams: true}));
server.use(restify.plugins.bodyParser());

// pre allows us to always
server.pre(function (req, res, next) {
  console.log(`IN: server.pre [${req.getPath()}]`);
  next();
});

// Applying JWT here protects all routes except those in the unless
server.use(rest_jwt({secret: constants.SECRET}).unless({path: ['/token']}));

server.listen(constants.PORT, () => {
  console.info(`${server.name} listening at: ${server.url}`);
});
