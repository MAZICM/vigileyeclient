import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ cardID }) => {
  const [ownerName, setOwnerName] = useState('');
  const [imageData, setImageData] = useState('');
  const [filename, setFilename] = useState('');

  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
        const response = await axios.get(`/api/getOwnerDetails?cardID=${cardID}`);
        const { name, image_data, filename } = response.data;
        setOwnerName(name);
        setImageData(image_data);
        setFilename(filename);
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
        <div className="flex items-center">
          <div className="w-32 h-32 bg-gray-300 rounded-full mr-4">
            {imageData && <img src={`data:image/png;base64,${imageData}`} alt={filename} className="object-cover w-full h-full rounded-full" />}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-black">Dashboard</h1>
            <p className="text-black">Welcome to the dashboard</p>
          </div>
        </div>
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
