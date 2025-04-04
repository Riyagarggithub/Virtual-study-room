const express = require('express');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','home', 'index.html'));
});
app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','chat', 'index.html'));
});


// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Initialize Socket.io
const io = socketio(server);

// Store connected users
const users = {};

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New user connected');

  // When a new user joins
  socket.on('new-user', (username) => {
    users[socket.id] = username;
    socket.broadcast.emit('user-connected', username);
    io.emit('update-users', Object.values(users));
  });

  // When a message is sent
  socket.on('send-chat-message', (message) => {
    socket.broadcast.emit('chat-message', {
      message,
      username: users[socket.id]
    });
  });

  // When someone is typing
  socket.on('typing', () => {
    socket.broadcast.emit('user-typing', users[socket.id]);
  });

  // When user disconnects
  socket.on('disconnect', () => {
    const username = users[socket.id];
    delete users[socket.id];
    socket.broadcast.emit('user-disconnected', username);
    io.emit('update-users', Object.values(users));
    console.log('User disconnected');
  });
});