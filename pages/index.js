// Import necessary modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import Dashboard from '/components/Dashboard';

// Main functional component
const Index = () => {
  // State variables
  const [latestCardID, setLatestCardID] = useState('0000');
  const socket = io('http://192.168.11.154:5000');

  // useEffect hook to handle side effects
  useEffect(() => {
    // Listen for 'latest_cardID' event emitted by the Flask server
    socket.on('latest_cardID', (data) => {
      setLatestCardID(data.cardID);
    });

    // Clean up the event listener
    return () => {
      socket.disconnect();
    };
  }, []); // Ensure this effect runs only once

  // Render the Dashboard component with the latest card ID
  return (
    <div>
      <Dashboard cardID={latestCardID} />
    </div>
  );
};

// Export the component as default
export default Index;
