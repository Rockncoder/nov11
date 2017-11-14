const socketio = require('socket.io');
const dl = require('delivery');
const fs = require('fs');

// Note: How we are passing "server" to our module
module.exports = (server) => {
  const io = socketio.listen(server.server); //Note server.server instead of just server

  io.on('connection', socket => {
    // const delivery = dl.listen(socket);
    // delivery.on('receive.success', file => {
    //   // const params = file.params;
    //   fs.writeFile(file.name, file.buffer, (err) => {
    //     if (err) {
    //       console.log('File could not be saved.');
    //     } else {
    //       console.log('File saved.');
    //     }
    //   });
    // });

    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chat message', msg => {
      console.log('message: ' + msg);
      socket.emit('hello', { hello: 'world' });
    });
    socket.on('file drop', msg => {
      console.log('dropping: ' + msg);
    });
  });
};