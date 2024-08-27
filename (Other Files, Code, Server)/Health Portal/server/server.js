const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Health Monitor Server is running');
});

// Handle socket.io connections
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Listen for health data from the machine
  socket.on('healthDecision', (data) => {
    console.log('Health Data received:', data);

    // Emit a critical condition if necessary
    if (data == "yes") {
      io.emit('criticalCondition', data);
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
