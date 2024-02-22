const http = require('http');
const app = require('./app');
const socketIO = require('socket.io');
const cors = require('cors');
// set the application port
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3002');
app.set('port', port);

// create a server
const server = http.createServer(app);
const io = socketIO(server);

// Utilisez cors() pour autoriser toutes les requêtes cross-origin
app.use(cors());
// move the socketIO creation before attaching to the server
// const io = require('socket.io')(server);

// io.on('connection', (socket) => {
//   console.log('Client connecté');

//   socket.on('disconnect', () => {
//     console.log('Client déconnecté');
//   });
// });
// set the error handler and an event listener
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// make server listen on port
server.listen(port);

// export the io instance
module.exports = io;
