import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import Dashboard from '/components/Dashboard';

const ENDPOINT = 'http://localhost:5000'; // Update with your server endpoint

function App() {
  const [latestCardID, setLatestCardID] = useState('');
  const [cardOwnerName, setCardOwnerName] = useState('');

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('latest_cardID', (data) => {
      console.log('Received latest card ID:', data.cardID);
      setLatestCardID(data.cardID);
      fetchOwnerName(data.cardID); // Fetch owner name when a new card ID is received
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchOwnerName = async (cardID) => {
    try {
      const response = await axios.get(`${ENDPOINT}/api/getOwnerName?cardID=${cardID}`);
      console.log('Owner name:', response.data.ownerName);
      setCardOwnerName(response.data.ownerName);
    } catch (error) {
      console.error('Error fetching owner name:', error);
      setCardOwnerName(''); // Reset card owner name if an error occurs
    }
  };

  return (
    <div>
      <Dashboard cardID={latestCardID} cardOwnerName={cardOwnerName} />
    </div>
  );
}

export default App;
