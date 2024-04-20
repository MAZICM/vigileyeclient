import { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function Home() {
  const [ownerImage, setOwnerImage] = useState(null);
  const [cardID, setCardID] = useState('1111');

  // useEffect hook to handle side effects
  useEffect(() => {
    const socket = io('http://192.168.11.154:5000');  // Connect to Flask-SocketIO server
    
    // Listen for updates to the latest card ID from the server
    socket.on('latest_cardID', ({ cardID }) => {
      setCardID(cardID);  // Update cardID state with the latest value
    });

    // Clean up socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);  // Empty dependency array ensures useEffect runs only once

  // Fetch owner image based on the updated card ID
  useEffect(() => {
    // Fetch the owner image based on the card ID
    fetch(`http://192.168.11.154:5000/api/getOwnerImage?cardID=${cardID}`)
      .then(response => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error('Network response was not ok.');
      })
      .then(blob => {
        // Create a URL for the blob and set it as the owner image
        const imageUrl = URL.createObjectURL(blob);
        setOwnerImage(imageUrl);
      })
      .catch(error => console.error('Error fetching image:', error));
  }, [cardID]);  // Fetch image whenever cardID changes

  // Your JSX code...
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-xl w-full mx-auto p-8 shadow-md rounded-md bg-white">
        <h1 className="text-3xl font-semibold mb-4 text-center">Owner Image</h1>
        <div className="flex justify-center">
          {ownerImage ? (
            <img src={ownerImage} alt="Owner" className="rounded-lg" />
          ) : (
            <div className="bg-gray-300 w-64 h-64 flex items-center justify-center rounded-lg">
              <span className="text-gray-500">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
