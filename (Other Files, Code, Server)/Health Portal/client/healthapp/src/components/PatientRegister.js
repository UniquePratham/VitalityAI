import React, { useState } from 'react';
import Web3 from 'web3';
import HealthMonitor from '../contracts/HealthMonitor.json';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';

const PatientRegister = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  //const [web3, setWeb3] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('');

  const registerPatient = async () => {
    try {
  /*    if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
      }else if (window.web3){
        const web3Instance = new Web3(window.web3.currentProvider);
        setWeb3(web3Instance);
      } else {*/
      const web3 = new Web3(Web3.givenProvider ||  "https://7c8a-43-251-179-190.ngrok-free.app");
     // const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
      //const web3Instance = new Web3(provider);  
     // setWeb3(web3Instance);}
    
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();

      // Logging for debugging purposes
      console.log('Network ID:', networkId);
      console.log('Accounts:', accounts);
      console.log(HealthMonitor.networks[networkId]);

      // Check if the contract is deployed on the current network
      const deployedNetwork = HealthMonitor.networks[networkId];
      if (!deployedNetwork) {
        throw new Error(`Contract not deployed on the current network (network ID: ${networkId})`);
      }

      // More logging for debugging
      console.log('Deployed network:', deployedNetwork);

      const contract = new web3.eth.Contract(
        HealthMonitor.abi,
        deployedNetwork && deployedNetwork.address
      );
      setContract(contract);
      // Ensure the contract is correctly instantiated
      if (!contract || !contract.methods) {
        throw new Error('Failed to instantiate contract.');
      }

      console.log('Contract address:', deployedNetwork.address);

      // Call the smart contract method
      await contract.methods.registerPatient(name, age).send({ from: accounts[0] });
      setStatus('Patient registered successfully!');
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Error registering patient:', error);
      setStatus('Failed to register patient. ' + error.message);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Register Patient
      </Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Age"
          type="number"
          variant="outlined"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={registerPatient}
        >
          Register Patient
        </Button>
        {status && (
          <Typography
            variant="body2"
            color={status.includes('successfully') ? 'green' : 'red'}
            sx={{ mt: 2 }}
          >
            {status}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default PatientRegister;
