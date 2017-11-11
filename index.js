const restify = require('restify');
const Logger = require('bunyan');
const name = 'picklerick';
const log = new Logger({name: name});
const restifyBunyanLogger = require('restify-bunyan-logger');
const server = restify.createServer({name, log});
server.on('after', restifyBunyanLogger());
const socketio = require('socket.io');
const dl = require('delivery');
const fs = require('fs');
const io = socketio.listen(server.server); //Note server.server instead of just server
const jwt = require('restify-jwt');


io.on('connection', socket => {
  const delivery = dl.listen(socket);
  delivery.on('receive.success', file => {
    // const params = file.params;
    fs.writeFile(file.name, file.buffer, (err) => {
      if (err) {
        console.log('File could not be saved.');
      } else {
        console.log('File saved.');
      }
    });
  });

  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', msg => {
    console.log('message: ' + msg);
  });
});

const PORT = 8000;
const contactRoute = '/contact/:id';
const contactAllRoute = '/contact';
const tokenRoute = '/token';

const tokenGetHandler = (req, res, next) => {
  if (req.body.email && req.body.password) {
    const email = req.body.email;
    const password = req.body.password;
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      const payload = {
        id: user.id
      };
      const token = jwt.encode(payload, cfg.jwtSecret);
      res.json({token});
      return;
    }
  }
  res.sendStatus(401);
  next();
};
const contactGetAllHandler = (req, res, next) => {
  req.log.info('have "req_id" and "route" fields in route handler');
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

server.use(restify.plugins.queryParser({mapParams: true}));
server.use(restify.plugins.bodyParser());

server.get(tokenRoute, tokenGetHandler);
server.get(contactAllRoute, contactGetAllHandler);
server.get(contactRoute, contactGetHandler);
server.post(contactRoute, contactPostHandler);
server.put(contactRoute, contactPutHandler);
server.del(contactRoute, contactDeleteHandler);

server.pre(function (req, res, next) {
  server.log.info({req}, 'no req.log in pre handler');
  next();
});


server.listen(PORT, () => {
  console.info(`${server.name} listening at: ${server.url}`);
});
