const { app } = require('./helper');
const http = require('http');
const server = http.createServer(app)
const PORT = 3001;

//for sockets
const { Server } = require("socket.io");
const io = new Server(server); //socket instance

io.on('connection', (socket) => { //listens for connectin
  console.log('a user is connected');
  socket.on('disconnect', () => {
    console.log('user chao chao');
  });
})


server.listen(PORT, () => {
  console.info(`http://127.0.0.1:${PORT}`);
});
