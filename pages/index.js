import { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function Home() {
  const [ownerName, setOwnerName] = useState('Loading...');
  const [ownerImage, setOwnerImage] = useState(null);
  const [cardID, setCardID] = useState('');

  useEffect(() => {
    const socket = io('http://192.168.11.154:5000');

    socket.on('latest_cardID', ({ cardID, ownerName }) => {
      setCardID(cardID);
      setOwnerName(ownerName);  // Set the owner's name when cardID is received
    });

    return () => {
      socket.disconnect();  // Clean up socket connection
    };
  }, []);

  // Fetch owner image based on the updated card ID
  useEffect(() => {
    fetch(`http://192.168.11.154:5000/api/getOwnerImage?cardID=${cardID}`)
      .then(response => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error('Network response was not ok.');
      })
      .then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        setOwnerImage(imageUrl);
      })
      .catch(error => console.error('Error fetching image:', error));
  }, [cardID]);  // Fetch image when cardID changes

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-xl w-full mx-auto p-8 shadow-md rounded-md bg-white">
        <h1 className="text-3xl font-semibold mb-4 text-center text-black">Card Owner Information</h1>
        
        <div className="flex flex-col items-center">
          {ownerImage ? (
            <img src={ownerImage} alt="Owner" className="rounded-lg w-64 h-64" />
          ) : (
            <div className="bg-gray-300 w-64 h-64 flex items-center justify-center rounded-lg">
              <span className="text-gray-500">Loading...</span>
            </div>
          )}

          <h2 className="mt-4 text-xl font-semibold text-black">
            {ownerName}
          </h2>
        </div>
      </div>
      <div className="max-w-xl w-full mx-auto p-8 shadow-md rounded-md bg-white">
        <h1 className="text-3xl font-semibold mb-4 text-center text-black">Card Scanner Information</h1>
        
        <div className="flex flex-col items-center">
          {ownerImage ? (
            <img src={ownerImage} alt="Owner" className="rounded-lg w-64 h-64" />
          ) : (
            <div className="bg-gray-300 w-64 h-64 flex items-center justify-center rounded-lg">
              <span className="text-gray-500">Loading...</span>
            </div>
          )}

          <h2 className="mt-4 text-xl font-semibold text-black">
            {ownerName}
          </h2>
        </div>
      </div>
    </div>
  );
}
