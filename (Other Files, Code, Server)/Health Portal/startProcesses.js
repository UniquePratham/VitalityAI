const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Define the commands to be executed in separate command prompts
const commands = [
  'cd server && node api.js',
  'cd server && node apiserver.js',
  'cd server && node server.js',
   'cd client && cd healthapp && cd src && npm start',
  'cd server && node cli.js'
 
];

// File to store PIDs of the command prompts
const pidFile = path.join(__dirname, 'pids.json');

// Function to open a new command prompt and execute a command
function openCommandPrompt(command, minimized) {
  const startCommand = minimized ? `start /min cmd /k "${command}"` : `start cmd /k "${command}"`;
  exec(startCommand, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing command: ${err}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}

// Function to get the PID of the last command executed
function getLastPid(callback) {
  exec('wmic process where "CommandLine like \'%node%\'" get ProcessId', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error getting PIDs: ${err}`);
      return;
    }
    const pids = stdout.split('\n').slice(1).filter(pid => pid.trim().length > 0).map(pid => parseInt(pid.trim(), 10));
    callback(pids);
  });
}

// Start processes and store PIDs
const pids = [];
commands.forEach((command, index) => {
  // Minimize all processes except the last one
  const minimized = index < commands.length - 1;
  openCommandPrompt(command, minimized);

  // Wait a bit for the process to start and then get its PID
  setTimeout(() => {
    getLastPid((newPids) => {
      pids.push(...newPids);
      if (index === commands.length - 1) {
        fs.writeFileSync(pidFile, JSON.stringify(pids, null, 2));
        console.log('All commands started and PIDs saved.');
      }
    });
  }, 1000);
});
