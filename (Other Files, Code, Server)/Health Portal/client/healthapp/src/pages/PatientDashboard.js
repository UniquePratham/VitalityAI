import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Web3 from 'web3';
import HealthMonitor from '../contracts/HealthMonitor.json';
import { Container, Paper, Typography, Grid, Button, Alert } from '@mui/material';

const PatientDashboard = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    age: '',
    ambulance: '',
    doctor: '',
  });
  const [criticalCondition, setCriticalCondition] = useState(null);

  const connect_contract = async () => {
    try {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = HealthMonitor.networks[networkId];
      if (!deployedNetwork) {
        throw new Error(`Contract not deployed on the current network (network ID: ${networkId})`);
      }

      console.log('Deployed network:', deployedNetwork);

      const contract = new web3.eth.Contract(
        HealthMonitor.abi,
        deployedNetwork && deployedNetwork.address
      );
      setContract(contract);
      if (!contract || !contract.methods) {
        throw new Error('Failed to instantiate contract.');
      }
      const details = await contract.methods.getPatientInfo(accounts[0]).call();
    
      setPatientDetails({
        name: details.name,
        age: details.age,
        ambulance: details[3],
        doctor: details[4],
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };
  useEffect(() => {
    connect_contract();
  }, []);
  useEffect(() => {
  
    const socket = io('http://localhost:5000');

    socket.on('criticalCondition', async (condition) => {
      try {
        setCriticalCondition(condition);
        await contract.methods.handleHealthCondition(condition).send({ from: account });
        alert(`Health condition handled: ${condition}`);
      } catch (error) {
        console.error('Error handling health condition:', error);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [contract, account]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Patient Dashboard
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Name:</strong> {patientDetails.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1"><strong>Age:</strong> {patientDetails.age}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Assigned Ambulance:</strong> {patientDetails.ambulance}</Typography>
          </Grid>
          <Grid item xs={18}>
            <Typography variant="body1"><strong>Assigned Doctor:</strong> {patientDetails.doctor}</Typography>
          </Grid>
        </Grid>
        {criticalCondition !== null && (
          <Alert severity={criticalCondition ? 'error' : 'success'} style={{ marginTop: '20px' }}>
            {criticalCondition ? 'Critical condition detected!' : 'No critical condition detected.'}
          </Alert>
        )}
      </Paper>
      <Button variant="contained" color="primary" style={{ marginTop: '20px' }} fullWidth>
        Refresh Dashboard
      </Button>
    </Container>
  );
};

export default PatientDashboard;
