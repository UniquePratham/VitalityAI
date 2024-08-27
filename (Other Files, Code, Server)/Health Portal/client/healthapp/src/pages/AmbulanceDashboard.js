import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import HealthMonitor from '../contracts/HealthMonitor.json';
import { Container, Paper, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, AppBar, Toolbar } from '@mui/material';
const AmbulanceDashboard = () => {
  const [assignedPatients, setAssignedPatients] = useState([]);
  const [account,setAccount] = useState(null);
  const[contract,setContract] = useState(null);

  const fetchAssignedPatients = async () => {
    try {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      const account = await web3.eth.getAccounts();
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
      const patients = await contract.methods.getAssignedPatients().call({ from: account[0] });
      setAssignedPatients(patients);
      setAccount(account[0]);
    } catch (error) {
      console.error('Error fetching assigned patients:', error);

    }
  };

  useEffect(() => {
   fetchAssignedPatients();
},[]);



  return (
    <div>
      <h2>Ambulance Dashboard</h2>
      <ul>
        {assignedPatients.map((patient, index) => (
          <li key={index}>{patient}</li>
        ))}
      </ul>
    </div>
  );
};

export default AmbulanceDashboard;
