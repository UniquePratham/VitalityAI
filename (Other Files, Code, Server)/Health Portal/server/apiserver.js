/*const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

// Variable to store the last received data
let lastReceivedData = null;

// Handle socket.io connections
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Listen for random numbers from the client
  socket.on('randomNumber', (data) => {
    console.log('Number received:', data);
    
    // Ensure data is a valid format for sending
    if (typeof data === 'number') {
      lastReceivedData = { number: data }; // Transform to an object
    } else {
      lastReceivedData = data; // Assuming it's already an object
    }

    // Emit the received number to all connected clients
    io.emit('numberReceived', data);
  });
});

// Define the GET route
app.get('/', (req, res) => {
  console.log('Sending data:', lastReceivedData);
  
  // Send the last received data
  if (lastReceivedData === null) {
    res.send({ error: 'No data received yet' });
  } else {
    res.send(lastReceivedData);
  }
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));*/
/*const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

// Variables to store the last received data and threshold
let lastReceivedData = null;
let threshold = null; // Initialize threshold variable

// Handle socket.io connections
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Listen for random numbers from the client
  socket.on('randomNumber', (data) => {
    console.log('Number received:', data);
    
    // Ensure data is a valid format for sending
    if (typeof data === 'number') {
      lastReceivedData = { number: data }; // Transform to an object
    } else {
      lastReceivedData = data; // Assuming it's already an object
    }

    // Emit the received number to all connected clients
    io.emit('numberReceived', data);
  });

  // Listen for threshold updates from the client
});

// Define the GET route
app.get('/', (req, res) => {
  console.log('Sending  threshold:',  threshold);
  
  
  // Send the last received data and threshold value
  if (lastReceivedData === null ) {
    res.send({ error: 'No data or threshold received yet' });
  } else {
    res.send({ data: lastReceivedData });
  }
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); */
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

// Variables to store the last received data and threshold
let lastReceivedData = null;
let threshold = null;
let buffer = [];
const BUFFER_SIZE = 5;
let previousNodeHash = null;
let IcurrentHash = null;
// Function to generate hash of data
function generateHash(data) {
  const hash = crypto.createHash('sha256');
  hash.update(JSON.stringify(data));
  return hash.digest('hex');
}

// Handle socket.io connections
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Listen for random numbers from the client
  socket.on('randomNumber', (data) => {
    console.log('Number received:', data);
    
    // Ensure data is a valid format for sending
    if (typeof data === 'number') {
      lastReceivedData = { number: data }; // Transform to an object
    } else {
      lastReceivedData = data; // Assuming it's already an object
    }

    // Add data to buffer
    buffer.push(lastReceivedData);

    // If buffer is full, generate hash and compare
    if (buffer.length === BUFFER_SIZE) {
      const currentHash = generateHash(buffer);
      console.log('Generated hash:', currentHash);

   IcurrentHash = currentHash;
      // Emit the current hash to the next node
      io.emit('previousNodeHash', currentHash);

      // Clear the buffer
      buffer = [];
    }

    // Emit the received number to all connected clients
    io.emit('numberReceived', data);
  });

  // Listen for hash from previous node
  socket.on('previousNodeHash', (hash) => {
    console.log('Received hash from previous node:', hash);
    previousNodeHash = hash;
    if (previousNodeHash) {
      if (IcurrentHash === previousNodeHash) {
        
        console.log('Data is ok - Hash matches with previous node');
      } else {
        console.log('Data is not ok - Hash does not match with previous node');
      }
    } else {
      console.log('No previous node hash available for comparison');
    }
  });
 

});

// Define the GET route
app.get('/', (req, res) => {
  console.log('Sending threshold:', threshold);
  
  // Send the last received data and threshold value
  if (lastReceivedData === null) {
    res.send({ error: 'No data or threshold received yet' });
  } else {
    res.send({ data: lastReceivedData });
  }
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

