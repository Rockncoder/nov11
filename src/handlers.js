const jwt = require('jsonwebtoken');
const users = require('./users');
const routes = require('./routes');
const CONSTANTS = require('./constants');
const streams = require('./streaming');
const Vehicle = require('../models/Vehicles');


let counter = 0;
const tokenPostHandler = (req, res, next) => {
  if (req.body.email && req.body.password) {
    const email = req.body.email;
    const password = req.body.password;
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      const payload = {
        id: user.id
      };
      const token = jwt.sign(payload, CONSTANTS.SECRET);
      res.json({token});
      // note: we don't next here
      return;
    }
  }
  res.send(401);
  next();
};

const contactGetAllHandler = (req, res, next) => {
  console.log("Hello contactGetAllHandler");
  res.send(`Get all`);
  next();
};

const contactGetHandler = (req, res, next) => {
  const id = req.params.id;
  res.send(`Get ${id}`);
  next();
};

const contactPostHandler = (req, res, next) => {
  const id = req.params.id;
  res.send(`Post ${id}`);
  next();
};

const contactPutHandler = (req, res, next) => {
  const id = req.params.id;
  res.send(`Put ${id}`);
  next();
};

const contactDeleteHandler = (req, res, next) => {
  const id = req.params.id;
  res.send(`Delete ${id}`);
  next();
};

const streamGetHandler = (req, res, next ) => {
  res.setHeader('content-type', 'text/plain');
  streams.readStream2(req, res);
  res.write(`GET STREAM\n`);
  next();
};

const streamGetHandler2 = (req, res, next ) => {
  Vehicle.find({}, (err, vehicle) => {
    if (err) return console.error(err);
    res.json(vehicle);
  }).limit(CONSTANTS.PAGE_COUNT);
};

const streamGetHandler3 = (req, res, next ) => {
  const cursor = Vehicle.find({}).cursor();
  cursor.on('data', doc => {
    res.write(doc);
  });
  cursor.on('end', () => {
    res.end();
  });
};

// Note: how we are passing "server" in
module.exports = (server) => {
  server.post(routes.tokenRoute, tokenPostHandler);
  server.get(routes.contactAllRoute, contactGetAllHandler);
  server.get(routes.contactRoute, contactGetHandler);
  server.post(routes.contactRoute, contactPostHandler);
  server.put(routes.contactRoute, contactPutHandler);
  server.del(routes.contactRoute, contactDeleteHandler);
  server.get(routes.streamRoute, streamGetHandler2);
  server.get(routes.streamRoute3, streamGetHandler3);

  return {
    tokenPostHandler,
    contactGetAllHandler,
    contactGetHandler,
    contactPostHandler,
    contactPutHandler,
    contactDeleteHandler
  };
};