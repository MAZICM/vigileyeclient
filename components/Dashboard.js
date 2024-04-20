  import React, { useState, useEffect } from 'react';
  import axios from 'axios';

  const Dashboard = ({ cardID }) => {
    const [ownerName, setOwnerName] = useState('');
    const [imageData, setImageData] = useState('');
    const [filename, setFilename] = useState('');

    useEffect(() => {
      const fetchOwnerDetails = async () => {
        try {
          // Fetch owner's name
          const nameResponse = await axios.get(`/api/getOwnerName?cardID=${cardID}`);
          const { ownerName } = nameResponse.data;
          setOwnerName(ownerName);
          
          // Fetch owner's image data
          const imageResponse = await axios.get(`/api/getOwnerImage?cardID=${cardID}`);
          const { imageData } = imageResponse.data;
          setImageData(imageData);

          // Log the image data to inspect
          console.log("Image Data:", imageData);
        } catch (error) {
          console.error('Error fetching owner details:', error);
        }
      };

      if (cardID) {
        fetchOwnerDetails();
      }
    }, [cardID]);
 <Dashboard cardID={latestCardID} cardOwnerName={cardOwnerName} />
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
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2 text-black">Owner's Image:</h2>
           
          </div>
        </div>
      </div>
    );
  };

  export default Dashboard;
