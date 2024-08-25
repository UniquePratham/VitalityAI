import React, { useState } from 'react';
import Web3 from 'web3';
import HealthMonitor from '../contracts/HealthMonitor.json';

const AmbulanceRegister = () => {
  const [ambulanceAddress, setAmbulanceAddress] = useState('');
  const [rank, setRank] = useState('');
  const [status, setStatus] = useState('');

  const registerAmbulance = async () => {
    try {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = HealthMonitor.networks[networkId];
      const contract = new web3.eth.Contract(
        HealthMonitor.abi,
        deployedNetwork && deployedNetwork.address,
      );

      await contract.methods.registerAmbulance(ambulanceAddress, rank).send({ from: accounts[0] });
      setStatus('Ambulance registered successfully!');
    } catch (error) {
      console.error('Error registering ambulance:', error);
      setStatus('Failed to register ambulance.');
    }
  };

  return (
    <div>
      <h2>Register Ambulance</h2>
      <input
        type="text"
        placeholder="Ambulance Address"
        value={ambulanceAddress}
        onChange={(e) => setAmbulanceAddress(e.target.value)}
      />
      <input
        type="number"
        placeholder="Rank"
        value={rank}
        onChange={(e) => setRank(e.target.value)}
      />
      <button onClick={registerAmbulance}>Register Ambulance</button>
      <p>{status}</p>
    </div>
  );
};

export default AmbulanceRegister;
