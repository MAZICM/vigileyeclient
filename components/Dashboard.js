import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Image from 'next/image';

const SOCKET_SERVER_ENDPOINT = 'http://192.168.11.154:5000';

const Dashboard = () => {
  const [cardID, setCardID] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [imageData, setImageData] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const socket = io(SOCKET_SERVER_ENDPOINT);

    socket.on('latest_cardID', (data) => {
      setCardID(data.cardID);
      setLoading(false);
    });

    socket.on('ownerDetails', async (data) => {
      try {
        // Fetch owner's name
        const nameResponse = await axios.get(`/api/getOwnerName?cardID=${data.cardID}`);
        setOwnerName(nameResponse.data.ownerName);

        // Fetch owner's image data
        const imageResponse = await fetch(`/api/getOwnerImage?cardID=${data.cardID}`);
        if (!imageResponse.ok) {
          throw new Error('Failed to fetch image');
        }
        const imageBlob = await imageResponse.blob();
        const imageBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(imageBlob);
        });
        setImageData(imageBase64);
      } catch (error) {
        console.error('Error fetching owner details:', error);
        setError('Error fetching owner details');
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-xl w-full mx-auto p-8 shadow-md rounded-md bg-gray-100">
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2 text-black">Card ID:</h2>
          <p className="text-black">{cardID}</p>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2 text-black">Owner Name:</h2>
          <p className="text-black">{ownerName}</p>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2 text-black">Image:</h2>
          {imageData && <Image src={imageData} alt="Owner" width={400} height={400} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
