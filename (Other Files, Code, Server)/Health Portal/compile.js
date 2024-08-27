const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

// Path to the Solidity contract
const contractPath = path.resolve(__dirname, 'build','contracts', 'HealthMonitorV2.sol');
// Path where the compiled JSON file will be stored
const outputPath = path.resolve(__dirname, 'build','contracts', 'HealthMonitor.json');

// Read the Solidity file
const source = fs.readFileSync(contractPath, 'utf8');

// Configure the input for the Solidity compiler
const input = {
    language: 'Solidity',
    sources: {
        'HealthMonitor.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['abi', 'evm.bytecode'],
            },
        },
    },
};

// Compile the contract
const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Extract the ABI and bytecode from the compiled contract
const contract = output.contracts['HealthMonitor.sol'].HealthMonitor;

// Ensure the output directory exists and write the JSON file
fs.ensureDirSync(path.dirname(outputPath));
fs.writeJsonSync(outputPath, contract, { spaces: 2 });

console.log(`Contract compiled successfully! Output saved to ${outputPath}`);
