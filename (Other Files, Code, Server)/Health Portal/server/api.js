const io = require('socket.io-client');

const socket = io('http://localhost:4000');

// Function to randomly generate a number between 30 and 90
const generateRandomNumber = () => {
  return Math.floor(Math.random() * (90 - 30 + 1)) + 30;
};

// Function to send the random number to the server every 10 seconds
const sendRandomNumber = () => {
  const number = generateRandomNumber();
  console.log('Sending number:', number);
  socket.emit('randomNumber', number);
};

// Send random number periodically
setInterval(sendRandomNumber, 10000); // 10 seconds
