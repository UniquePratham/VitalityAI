const io = require('socket.io-client');

// Connect to the server
const socket = io('http://localhost:5000');

// Function to randomly generate "yes" or "no"
const generateYesOrNo = () => {
  return Math.random() < 0.5 ? 'yes' : 'no';
};

// Function to send "yes" or "no" to the server every 30 seconds
const sendYesOrNo = () => {
  const decision = generateYesOrNo();
  console.log('Sending decision:', decision);
  socket.emit('healthDecision', decision);
  console.log(decision);
};

// Send decision periodically
setInterval(sendYesOrNo, 10000); // 30 seconds
