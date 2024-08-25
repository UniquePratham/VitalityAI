import React, { useState } from 'react';
import Web3 from 'web3';
import HealthMonitor from '../contracts/HealthMonitor.json';

const DoctorRegister = () => {
  const [doctorAddress, setDoctorAddress] = useState('');
  const [status, setStatus] = useState('');

  const registerDoctor = async () => {
    try {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = HealthMonitor.networks[networkId];
      const contract = new web3.eth.Contract(
        HealthMonitor.abi,
        deployedNetwork && deployedNetwork.address,
      );

      await contract.methods.registerDoctor(doctorAddress).send({ from: accounts[0] });
      setStatus('Doctor registered successfully!');
    } catch (error) {
      console.error('Error registering doctor:', error);
      setStatus('Failed to register doctor.');
    }
  };

  return (
    <div>
      <h2>Register Doctor</h2>
      <input
        type="text"
        placeholder="Doctor Address"
        value={doctorAddress}
        onChange={(e) => setDoctorAddress(e.target.value)}
      />
      <button onClick={registerDoctor}>Register Doctor</button>
      <p>{status}</p>
    </div>
  );
};

export default DoctorRegister;
