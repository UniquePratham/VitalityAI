/*const io = require('socket.io-client');
const axios = require('axios'); // For making API requests

const socket = io('http://localhost:5000');

const BUFFER_SIZE = 5; // Size of buffer before calculating average
let buffer = [];
let threshold = 75; // Default threshold value

// Variables for tracking consecutive identical data
let lastHeartbeat = null;
let consecutiveCount = 0;
const CONSECUTIVE_LIMIT = 5; // Limit for consecutive identical data
const WARNING_LIMIT = 10; // Limit for first warning
const STOP_LIMIT = 15; // Limit for stopping data sending

// Function to randomly generate "yes" or "no"
const generateYesOrNo = () => {
  return Math.random() < 0.5 ? 'yes' : 'no';
};

// Function to send "yes" or "no" to the server every 10 seconds
const sendYesOrNo = () => {
  if (consecutiveCount <= STOP_LIMIT) { // Check if we should still send data
    const decision = generateYesOrNo();
    console.log('Sending decision:', decision);
    socket.emit('healthDecision', decision);
  }
};

// Function to fetch heartbeat data from an API
const fetchHeartbeatData = async () => {
  try {
    const response = await axios.get('http://localhost:4000'); // Replace with your API endpoint
    console.log(response.data.number);
    const heartbeat = response.data.number;
    processHeartbeatData(heartbeat);
  } catch (error) {
    console.error('Error fetching heartbeat data:', error);
  }
};

// Function to process the heartbeat data
const processHeartbeatData = (heartbeat) => {
  buffer.push(heartbeat);
  console.log('Received heartbeat:', heartbeat);

  // Check for consecutive identical data
  if (heartbeat === lastHeartbeat) {
    consecutiveCount++;
  } else {
    lastHeartbeat = heartbeat;
    consecutiveCount = 1; // Reset the counter
  }

  if (consecutiveCount >= WARNING_LIMIT) {
    console.log('Check server, warning 2');
    // Optionally stop the script here, or just prevent sending data
  } else if (consecutiveCount >= CONSECUTIVE_LIMIT) {
    console.log('Check the server, something is wrong');
  }
  if (buffer.length === BUFFER_SIZE) {
    const averageHeartbeat = buffer.reduce((sum, value) => sum + value, 0) / BUFFER_SIZE;
    console.log('Buffer full. Calculated average heartbeat:', averageHeartbeat.toString());

    // Clear the buffer for new data
    buffer = [];

    // Compare average heartbeat with the threshold
    if (averageHeartbeat > threshold && consecutiveCount <= STOP_LIMIT) {
      console.log('Average heartbeat exceeds threshold. Sending "yes"');
      socket.emit('healthDecision', 'yes');
    } else if (consecutiveCount <= STOP_LIMIT) {
      console.log('Average heartbeat is below or equal to threshold. Sending "no"');
      socket.emit('healthDecision', 'no');
    } else if(consecutiveCount >= STOP_LIMIT){
      console.log("Data Sending Stop, Please Check the server!!");
    }
  
  }
};

const setThreshold = (newThreshold) => {
  threshold = newThreshold;
  console.log('Threshold set to:', threshold);
};

// Fetch heartbeat data periodically
setInterval(fetchHeartbeatData, 3000); // Every 3 seconds

// Send decision periodically
setInterval(sendYesOrNo, 100000); // Every 10 seconds

// Example: Set a new threshold value (for demonstration purposes)
setTimeout(() => {
  setThreshold(80); // Set new threshold after 10 seconds
}, 10000); */
//Function to set the threshold value.....................................................................................
//for GUI

/*const io = require('socket.io-client');
const axios = require('axios'); // For making API requests

const socket = io('http://localhost:5000');

const BUFFER_SIZE = 5; // Size of buffer before calculating average
let buffer = [];
let threshold = 75; // Default threshold value

// Variables for tracking consecutive identical data
let lastHeartbeat = null;
let consecutiveCount = 0;
const CONSECUTIVE_LIMIT = 5; // Limit for consecutive identical data
const WARNING_LIMIT = 10; // Limit for first warning
const STOP_LIMIT = 15; // Limit for stopping data sending

// Function to randomly generate "yes" or "no"
const generateYesOrNo = () => {
  return Math.random() < 0.5 ? 'yes' : 'no';
};

// Function to send "yes" or "no" to the server every 10 seconds
const sendYesOrNo = () => {
  if (consecutiveCount <= STOP_LIMIT) { // Check if we should still send data
    const decision = generateYesOrNo();
    console.log('Sending decision:', decision);
    socket.emit('healthDecision', decision);
  }
};

// Function to fetch heartbeat data from an API
const fetchHeartbeatData = async () => {
  try {
    const response = await axios.get('http://localhost:4000'); // Replace with your API endpoint
    console.log(response.data.number);
    const heartbeat = response.data.number;
    processHeartbeatData(heartbeat);
  } catch (error) {
    console.error('Error fetching heartbeat data:', error);
  }
};

// Function to fetch threshold value from the server
const fetchThreshold = async () => {
  try {
    const response = await axios.get('http://localhost:4000'); // Replace with your threshold endpoint
    const newThreshold = response.data.threshold;
    setThreshold(newThreshold);
  } catch (error) {
    console.error('Error fetching threshold data:', error);
  }
};

// Function to process the heartbeat data
const processHeartbeatData = (heartbeat) => {
  buffer.push(heartbeat);
  console.log('Received heartbeat:', heartbeat);

  // Check for consecutive identical data
  if (heartbeat === lastHeartbeat) {
    consecutiveCount++;
  } else {
    lastHeartbeat = heartbeat;
    consecutiveCount = 1; // Reset the counter
  }

  if (consecutiveCount >= WARNING_LIMIT) {
    console.log('Check server, warning 2');
    // Optionally stop the script here, or just prevent sending data
  } else if (consecutiveCount >= CONSECUTIVE_LIMIT) {
    console.log('Check the server, something is wrong');
  }
  
  if (buffer.length === BUFFER_SIZE) {
    const averageHeartbeat = buffer.reduce((sum, value) => sum + value, 0) / BUFFER_SIZE;
    console.log('Buffer full. Calculated average heartbeat:', averageHeartbeat.toString());

    // Clear the buffer for new data
    buffer = [];

    // Compare average heartbeat with the threshold
    if (averageHeartbeat > threshold && consecutiveCount <= STOP_LIMIT) {
      console.log('Average heartbeat exceeds threshold. Sending "yes"');
      socket.emit('healthDecision', 'yes');
    } else if (consecutiveCount <= STOP_LIMIT) {
      console.log('Average heartbeat is below or equal to threshold. Sending "no"');
      socket.emit('healthDecision', 'no');
    } else if (consecutiveCount >= STOP_LIMIT){
      console.log("Data Sending Stop, Please Check the server!!");
    }
  }
};

// Function to set the threshold value
const setThreshold = (newThreshold) => {
  threshold = newThreshold;
  console.log('Threshold set to:', threshold);
};

// Fetch heartbeat data periodically
setInterval(fetchHeartbeatData, 3000); // Every 3 seconds

// Fetch threshold value periodically
setInterval(fetchThreshold, 60000); // Every 60 seconds

// Send decision periodically
setInterval(sendYesOrNo, 100000); // Every 100 seconds
setTimeout(() => {
  setThreshold(80); // Set new threshold after 10 seconds
}, 100000);*/
//..........................................................................................................
//for CLI
/*const io = require('socket.io-client');
const axios = require('axios');
const readline = require('readline');

const socket = io('http://localhost:5000');
const only_one_yes = 0;
const BUFFER_SIZE = 5; // Size of buffer before calculating average
let buffer = [];
let threshold = null; // Start with null, to indicate it's not set yet

// Variables for tracking consecutive identical data
let lastHeartbeat = null;
let consecutiveCount = 0;
const CONSECUTIVE_LIMIT = 5; // Limit for consecutive identical data
const WARNING_LIMIT = 10; // Limit for first warning
const STOP_LIMIT = 15; // Limit for stopping data sending

// Function to randomly generate "yes" or "no"
const generateYesOrNo = () => {
  return Math.random() < 0.5 ? 'yes' : 'no';
};

// Function to send "yes" or "no" to the server every 10 seconds
const sendYesOrNo = () => {
  if (threshold !== null && consecutiveCount <= STOP_LIMIT) { // Check if we should still send data
    const decision = generateYesOrNo();
    console.log('Sending decision:', decision);
    socket.emit('healthDecision', decision);
  }
};

// Function to fetch heartbeat data from an API
const fetchHeartbeatData = async () => {
  try {
    const response = await axios.get('http://localhost:4000'); // Replace with your API endpoint
  //  console.log(response);
    const heartbeat = response.data.data.number;
    processHeartbeatData(heartbeat);
  } catch (error) {
    console.error('Error fetching heartbeat data:', error);
  }
};

// Function to process the heartbeat data
const processHeartbeatData = (heartbeat) => {
  buffer.push(heartbeat);
  console.log('Received heartbeat:', heartbeat);

  // Check for consecutive identical data
  if (heartbeat === lastHeartbeat) {
    consecutiveCount++;
  } else {
    lastHeartbeat = heartbeat;
    consecutiveCount = 1; // Reset the counter
  }

  if (consecutiveCount >= WARNING_LIMIT) {
    console.log('Check server, warning 2');
    // Optionally stop the script here, or just prevent sending data
  } else if (consecutiveCount >= CONSECUTIVE_LIMIT) {
    console.log('Check the server, something is wrong');
  }

  if (buffer.length === BUFFER_SIZE) {
    const averageHeartbeat = buffer.reduce((sum, value) => sum + value, 0) / BUFFER_SIZE;
    console.log('Buffer full. Calculated average heartbeat:', averageHeartbeat.toString());

    // Clear the buffer for new data
    buffer = [];

    // Compare average heartbeat with the threshold
    if (threshold !== null) {
      if (averageHeartbeat > threshold && consecutiveCount <= STOP_LIMIT && only_one_yes == 0) {
        console.log('Average heartbeat exceeds threshold. Sending "yes"');
        socket.emit('healthDecision', 'yes');
        only_one_yes = 1;

      } else if (consecutiveCount <= STOP_LIMIT && only_one_yes == 0) {
        console.log('Average heartbeat is below or equal to threshold. Sending "no"');
        socket.emit('healthDecision', 'no');
      } else if (consecutiveCount >= STOP_LIMIT) {
        console.log("Data Sending Stop, Please Check the server!!");
      }
    }
  }
};

// Function to set the threshold value
const setThreshold = (newThreshold) => {
  threshold = newThreshold;
  console.log('Threshold set to:', threshold);
};

// Function to handle user input for threshold
const promptThreshold = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter the new threshold value: ', (answer) => {
    const newThreshold = parseFloat(answer);

    if (isNaN(newThreshold)) {
      console.log('Invalid input. Please enter a numeric value.');
      promptThreshold(); // Re-prompt if invalid input
    } else {
      setThreshold(newThreshold);
      rl.close();
      start(); // Start fetching data and sending decisions
    }
  });
};

// Function to start the main logic
const start = () => {
  // Fetch heartbeat data periodically
  setInterval(fetchHeartbeatData, 3000); // Every 3 seconds

  // Send decision periodically
  setInterval(sendYesOrNo, 100000); // Every 10 seconds
};

// Prompt user to set the threshold value
promptThreshold();
*/
const io = require('socket.io-client');
const axios = require('axios');
const readline = require('readline');
const crypto = require('crypto'); // Added for hash generation

const socket = io('http://localhost:5000');
const only_one_yes = 0;
const BUFFER_SIZE = 5; // Size of buffer before calculating average
let buffer = [];
let threshold = null; // Start with null, to indicate it's not set yet

// Variables for tracking consecutive identical data
let lastHeartbeat = null;
let consecutiveCount = 0;
const CONSECUTIVE_LIMIT = 5; // Limit for consecutive identical data
const WARNING_LIMIT = 10; // Limit for first warning
const STOP_LIMIT = 15; // Limit for stopping data sending

// Variable to store the hash from the previous node
let previousNodeHash = null;

// Function to generate hash of data
function generateHash(data) {
  const hash = crypto.createHash('sha256');
  hash.update(JSON.stringify(data));
  return hash.digest('hex');
}

// Function to randomly generate "yes" or "no"
const generateYesOrNo = () => {
  return Math.random() < 0.5 ? 'yes' : 'no';
};

// Function to send "yes" or "no" to the server every 10 seconds
const sendYesOrNo = () => {
  if (threshold !== null && consecutiveCount <= STOP_LIMIT) { // Check if we should still send data
    const decision = generateYesOrNo();
    console.log('Sending decision:', decision);
    socket.emit('healthDecision', decision);
  }
};

// Function to fetch heartbeat data from an API
const fetchHeartbeatData = async () => {
  try {
    const response = await axios.get('http://localhost:4000'); // Replace with your API endpoint
    const heartbeat = response.data.data.number;
    processHeartbeatData(heartbeat);
  } catch (error) {
    console.error('Error fetching heartbeat data:', error);
  }
};

// Function to process the heartbeat data
const processHeartbeatData = (heartbeat) => {
  buffer.push(heartbeat);
  console.log('Received heartbeat:', heartbeat);

  // Check for consecutive identical data
  if (heartbeat === lastHeartbeat) {
    consecutiveCount++;
  } else {
    lastHeartbeat = heartbeat;
    consecutiveCount = 1; // Reset the counter
  }

  if (consecutiveCount >= WARNING_LIMIT) {
    console.log('Check server, warning 2');
  } else if (consecutiveCount >= CONSECUTIVE_LIMIT) {
    console.log('Check the server, something is wrong');
  }

  if (buffer.length === BUFFER_SIZE) {
    const averageHeartbeat = buffer.reduce((sum, value) => sum + value, 0) / BUFFER_SIZE;
    console.log('Buffer full. Calculated average heartbeat:', averageHeartbeat.toString());

    // Generate hash of the buffer data
    const currentHash = generateHash(buffer);
    console.log('Generated hash:', currentHash);

    // Compare with previous node's hash if available
   
    // Clear the buffer for new data
    buffer = [];

    // Compare average heartbeat with the threshold
    if (threshold !== null) {
      if (averageHeartbeat > threshold && consecutiveCount <= STOP_LIMIT && only_one_yes == 0) {
        console.log('Average heartbeat exceeds threshold. Sending "yes"');
        socket.emit('healthDecision', 'yes');
        only_one_yes = 1;
      } else if (consecutiveCount <= STOP_LIMIT && only_one_yes == 0) {
        console.log('Average heartbeat is below or equal to threshold. Sending "no"');
        socket.emit('healthDecision', 'no');
      } else if (consecutiveCount >= STOP_LIMIT) {
        console.log("Data Sending Stop, Please Check the server!!");
      }
    }
  }
};

// Function to set the threshold value
const setThreshold = (newThreshold) => {
  threshold = newThreshold;
  console.log('Threshold set to:', threshold);
};

// Function to handle user input for threshold
const promptThreshold = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter the new threshold value: ', (answer) => {
    const newThreshold = parseFloat(answer);

    if (isNaN(newThreshold)) {
      console.log('Invalid input. Please enter a numeric value.');
      promptThreshold(); // Re-prompt if invalid input
    } else {
      setThreshold(newThreshold);
      rl.close();
      start(); // Start fetching data and sending decisions
    }
  });
};

// Function to start the main logic
const start = () => {
  // Fetch heartbeat data periodically
  setInterval(fetchHeartbeatData, 3000); // Every 3 seconds

  // Send decision periodically
  setInterval(sendYesOrNo, 100000); // Every 10 seconds
};

// Listen for hash from previous node
socket.on('previousNodeHash', (hash) => {
  console.log('Received hash from previous node:', hash);
  previousNodeHash = hash;
});

// Prompt user to set the threshold value
promptThreshold();