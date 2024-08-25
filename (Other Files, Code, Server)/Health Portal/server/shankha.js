/* const io = require('socket.io-client');

const socket = io('http://localhost:4000');


const { initializeApp } = require("firebase/app");
const { getDatabase, ref, onValue } = require("firebase/database");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpWdmVX83wL5Gpunp2DejkXXa-gYmVR7s",
  authDomain: "arduino-f8fe8.firebaseapp.com",
  databaseURL: "https://arduino-f8fe8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "arduino-f8fe8",
  storageBucket: "arduino-f8fe8.appspot.com",
  messagingSenderId: "996190803065",
  appId: "1:996190803065:web:8b4248eb216eaaa1e630a8",
  measurementId: "G-3QEXF8V2T1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

// Create a reference to the data you want to fetch
const dbRef = ref(database, 'Sensor/BPM');

// Variables to store the last received data and threshold
let lastReceivedData = null;
let threshold = null;

// Function to fetch and emit data
function fetchAndEmitData() {
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();

    if (typeof data === 'number') {
      lastReceivedData = { number: data };
    } else {
      lastReceivedData = data;
    }

    console.log('Number received:', lastReceivedData);
    socket.emit('randomNumber', lastReceivedData);

    // Emit the received number (in a real-world scenario, you would use socket.io or another communication method)
    console.log('Emitting number received event:', lastReceivedData);
  });
}

// Simulate setting a threshold and fetching data
function setThreshold(newThreshold) {
  threshold = newThreshold;
  console.log('Threshold set to:', threshold);
}

function getThresholdAndData() {
  console.log('Sending threshold:', threshold);

  if (lastReceivedData === null) {
    console.log({ error: 'No data or threshold received yet' });
  } else {
    console.log({ data: lastReceivedData });
  }
}

// Call the functions to simulate behavior
setThreshold(50); // Set a threshold value
fetchAndEmitData(); // Fetch and emit data
getThresholdAndData(); // Get the threshold and data */
const io = require('socket.io-client');
const crypto = require('crypto');
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, onValue } = require("firebase/database");

const socket = io('http://localhost:4000');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpWdmVX83wL5Gpunp2DejkXXa-gYmVR7s",
  authDomain: "arduino-f8fe8.firebaseapp.com",
  databaseURL: "https://arduino-f8fe8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "arduino-f8fe8",
  storageBucket: "arduino-f8fe8.appspot.com",
  messagingSenderId: "996190803065",
  appId: "1:996190803065:web:8b4248eb216eaaa1e630a8",
  measurementId: "G-3QEXF8V2T1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

// Create a reference to the data you want to fetch
const dbRef = ref(database, 'Sensor/BPM');

// Variables to store the last received data and threshold
let lastReceivedData = null;
let threshold = null;

// Buffer to store received data
const dataBuffer = [];
const BUFFER_SIZE = 5; // Adjust this value as needed

// Function to generate hash of data
function generateHash(data) {
  const hash = crypto.createHash('sha256');
  hash.update(JSON.stringify(data));
  return hash.digest('hex');
}

// Function to fetch and emit data
function fetchAndEmitData() {
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();

    if (typeof data === 'number') {
      lastReceivedData = { number: data };
    } else {
      lastReceivedData = data;
    }

    console.log('Number received:', lastReceivedData);
    socket.emit('randomNumber', lastReceivedData);

    // Add data to buffer
    dataBuffer.push(lastReceivedData);

    // If buffer is full, generate hash and send it
    if (dataBuffer.length >= BUFFER_SIZE) {
      const hash = generateHash(dataBuffer);
      console.log('Buffer full. Generated hash:', hash);
      
      // Send the hash to localhost:4000
      socket.emit('previousNodeHash', hash);

      // Clear the buffer
      dataBuffer.length = 0;
    }

    console.log('Emitting number received event:', lastReceivedData);
  });
}

// Simulate setting a threshold and fetching data
function setThreshold(newThreshold) {
  threshold = newThreshold;
  console.log('Threshold set to:', threshold);
}

function getThresholdAndData() {
  console.log('Sending threshold:', threshold);

  if (lastReceivedData === null) {
    console.log({ error: 'No data or threshold received yet' });
  } else {
    console.log({ data: lastReceivedData });
  }
}

// Call the functions to simulate behavior
setThreshold(50); // Set a threshold value
fetchAndEmitData(); // Fetch and emit data
getThresholdAndData(); // Get the threshold and data

// Listen for hash comparisons from the server
socket.on('hashComparison', (result) => {
  console.log('Hash comparison result:', result);
});