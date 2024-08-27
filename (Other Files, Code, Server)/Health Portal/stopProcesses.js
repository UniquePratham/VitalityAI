const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// File where PIDs are stored
const pidFile = path.join(__dirname, 'pids.json');

// Read PIDs from file and terminate processes
function stopProcesses() {
  if (!fs.existsSync(pidFile)) {
    console.error('No PID file found. Please start processes first.');
    return;
  }

  const pids = JSON.parse(fs.readFileSync(pidFile, 'utf8'));
  pids.forEach(pid => {
    exec(`taskkill /PID ${pid} /F`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error killing PID ${pid}: ${err}`);
        return;
      }
      console.log(`Stopped PID ${pid}`);
    });
  });

  fs.unlinkSync(pidFile);
  console.log('All processes stopped and PID file deleted.');
}

stopProcesses();
