const { exec } = require('child_process');

// Define the commands to be executed in separate command prompts
const commands = [
  'cd server && node api.js',
  'cd server && node apiserver.js',
  'cd server && node server.js',
  'cd server && node cli.js'
];

// Function to open a new command prompt and execute a command
function openCommandPrompt(command) {
  exec(`start cmd /k "${command}"`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing command: ${err}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}

// Execute each command in a new command prompt
commands.forEach(command => openCommandPrompt(command));
