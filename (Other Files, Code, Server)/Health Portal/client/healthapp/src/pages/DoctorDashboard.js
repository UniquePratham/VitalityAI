/*import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import HealthMonitor from '../contracts/HealthMonitor.json';
import { Container, Paper, Typography, Grid, Button, Alert } from '@mui/material';
const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const fetchPatients = async () => {
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
          const patientAddresses = await contract.methods.getAssignedPatients().call({ from: accounts[0] });
          setPatients(patientAddresses);
          setAccount(accounts[0]);
        }catch(error){
        console.error('Error fetching patient details:', error);
      }
    
    };


    useEffect(() => {
      fetchPatients();
    }, []);
  return (
    <div>
      <h2>Doctor Dashboard</h2>
      <ul>
        {patients.map((patient, index) => (
          <li key={index}>{patient}</li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorDashboard;
*/
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import HealthMonitor from '../contracts/HealthMonitor.json';
import { Container, Paper, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, AppBar, Toolbar } from '@mui/material';

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  const fetchPatients = async () => {
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
      const patientAddresses = await contract.methods.getAssignedPatients().call({ from: accounts[0] });
      setPatients(patientAddresses);
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Doctor Dashboard
          </Typography>
          {account && (
            <Typography variant="subtitle1" align="right">
              Account: {account}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Assigned Patients
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Patient Address</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.length > 0 ? (
                patients.map((patient, index) => (
                  <TableRow key={index}>
                    <TableCell>{patient}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>No patients assigned</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default DoctorDashboard;
