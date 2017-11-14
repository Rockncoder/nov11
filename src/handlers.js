const jwt = require('jsonwebtoken');
const users = require('./users');
const routes = require('./routes');

const tokenPostHandler = (req, res, next) => {
  if (req.body.email && req.body.password) {
    const email = req.body.email;
    const password = req.body.password;
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      const payload = {
        id: user.id
      };
      const token = jwt.sign(payload, secret);
      res.json({token});
      // next();
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

module.exports = (server) => {
  server.post(routes.tokenRoute, tokenPostHandler);
  server.get(routes.contactAllRoute, contactGetAllHandler);
  server.get(routes.contactRoute, contactGetHandler);
  server.post(routes.contactRoute, contactPostHandler);
  server.put(routes.contactRoute, contactPutHandler);
  server.del(routes.contactRoute, contactDeleteHandler);

  return {
    tokenPostHandler,
    contactGetAllHandler,
    contactGetHandler,
    contactPostHandler,
    contactPutHandler,
    contactDeleteHandler
  };
};