#!/usr/bin/env node

const { exec, spawn } = require('child_process');
const readline = require('readline');
const path = require('path');

const program = path.join(__dirname, 'startProcesses.js'); // Path to the script
const stopprogram = path.join(__dirname, 'stopProcesses.js');
// Function to open a new command prompt and run a command
function openCommandPrompt(command) {
  return spawn('cmd', ['/c', 'start', 'cmd', '/k', command], {
    detached: true,
    stdio: 'ignore',
  });
}

// Function to start processes
function startProcesses() {
  openCommandPrompt(`node ${program} start`);
  console.log('Processes started. Type "stop" to stop the processes.');
}

// Function to stop processes
function stopProcesses() {
  exec(`node ${stopprogram} stop`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error stopping processes: ${err}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    process.exit();
  });
}

// Set up readline interface to handle user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Starting processes...');

// Start the processes
startProcesses();

// Listen for user input
rl.on('line', (input) => {
  if (input.trim().toLowerCase() === 'stop') {
    console.log('Stopping processes...');
    stopProcesses();
  } else {
    console.log('Unknown command. Type "stop" to stop the processes.');
  }
});
