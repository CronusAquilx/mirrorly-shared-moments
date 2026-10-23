/**
 * Mirrorly Signaling Server
 * Handles room creation and WebRTC signaling between iOS agent and web viewer
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Serve the web viewer
app.use(express.static(path.join(__dirname, '../web')));

// Simple in-memory rooms (replace with Redis later for production)
const rooms = new Map();

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('create-room', (callback) => {
    const code = generateCode();
    rooms.set(code, {
      host: socket.id,
      viewers: [],
      createdAt: Date.now()
    });
    socket.join(code);
    socket.roomCode = code;
    socket.role = 'host';
    console.log(`Room created: ${code}`);
    callback({ code });
  });

  socket.on('join-room', ({ code }, callback) => {
    const room = rooms.get(code);
    if (!room) {
      callback({ error: 'Room not found' });
      return;
    }
    socket.join(code);
    socket.roomCode = code;
    socket.role = 'viewer';
    room.viewers.push(socket.id);
    console.log(`Viewer joined room ${code}`);
    callback({ success: true });
    // Notify host that a viewer joined
    io.to(room.host).emit('viewer-joined', { viewerId: socket.id });
  });

  // WebRTC signaling
  socket.on('signal', ({ to, data }) => {
    io.to(to).emit('signal', { from: socket.id, data });
  });

  // Control events from viewer → agent
  socket.on('control', (data) => {
    if (socket.roomCode) {
      // Send to everyone else in the room (the agent)
      socket.to(socket.roomCode).emit('control', data);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    if (socket.roomCode && rooms.has(socket.roomCode)) {
      const room = rooms.get(socket.roomCode);
      if (room.host === socket.id) {
        // Host left – close room
        io.to(socket.roomCode).emit('room-closed');
        rooms.delete(socket.roomCode);
      } else {
        room.viewers = room.viewers.filter(id => id !== socket.id);
      }
    }
  });
});

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  // Make sure it's unique
  if (rooms.has(code)) return generateCode();
  return code;
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Mirrorly server running on http://localhost:${PORT}`);
});
