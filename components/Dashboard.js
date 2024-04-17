import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ cardID }) => {
  const [ownerName, setOwnerName] = useState('');
  const [imageData, setImageData] = useState('');
  const [filename, setFilename] = useState('');

  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
        const response = await axios.get(`/api/getOwnerName?cardID=${cardID}`);
        const { ownerName } = response.data;
        setOwnerName(ownerName);
      } catch (error) {
        console.error('Error fetching owner details:', error);
      }
    };

    if (cardID) {
      fetchOwnerDetails();
    }
  }, [cardID]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-xl w-full mx-auto p-8 shadow-md rounded-md bg-gray-100">
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2 text-black">Card Owner Name:</h2>
          <p className="text-black">{ownerName}</p>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2 text-black">Card ID:</h2>
          <p className="text-black">{cardID}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
