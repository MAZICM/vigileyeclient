import { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function Home() {
  const [ownerName, setOwnerName] = useState('Loading...');
  const [ownerImage, setOwnerImage] = useState(null);
  const [cardID, setCardID] = useState('');
  const [aiFrame, setAiFrame] = useState(null);
  const [accessStatus, setAccessStatus] = useState(null);
  const [accessReason, setAccessReason] = useState(null);


  useEffect(() => {
    const socket = io('http://192.168.0.103:5000');  // Update with your server's address and port

    socket.on('latest_cardID', ({ cardID, ownerName }) => {
      setCardID(cardID);
      setOwnerName(ownerName);
    });

    socket.on('ai_frame', (data) => {
      if (data && data.frame) {
        setAiFrame(`data:image/jpeg;base64,${data.frame}`);  // Convert Base64 to data URI for <img>
      }
    socket.on('access_granted', () => {
      setAccessStatus('granted');
      setAccessReason(null); // No reason needed if granted
    });

    socket.on('access_refused', (data) => {
      setAccessStatus('refused');
      setAccessReason(data.reason); // Set the reason for refusal
      });
  
    });

    return () => {
      socket.disconnect();  // Clean up the socket connection
    };
  }, []);

  useEffect(() => {
    if (cardID) {
      fetch(`http://192.168.0.103:5000/api/getOwnerImage?cardID=${cardID}`)
        .then((response) => {
          if (response.ok) {
            return response.blob();
          }
          throw new Error("Network response was not ok.");
        })
        .then((blob) => {
          const imageUrl = URL.createObjectURL(blob);
          setOwnerImage(imageUrl);
        })
        .catch((error) => console.error("Error fetching image:", error));
    }
  }, [cardID]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Navigation Bar */}
      <div className="flex justify-between items-center p-4 bg-blue-600 text-white rounded-lg shadow-md">
        <h1 className="text-xl font-bold">VigilEye Dashboard</h1>
        <button className="bg-blue-800 px-4 py-2 rounded hover:bg-blue-700 transition">Logout</button>
      </div>

       {/* Access Status Section */}
       <div className="mt-8">
        {accessStatus === 'granted' ? (
          <div className="p-6 bg-green-100 text-green-800 rounded-lg shadow-md text-center">
            Access Granted
          </div>
        ) : accessStatus === 'refused' ? (
          <div className="p-6 bg-red-100 text-red-800 rounded-lg shadow-md text-center">
            Access Refused: {accessReason}
          </div>
        ) : (
          <div className="p-6 bg-gray-100 text-gray-800 rounded-lg shadow-md text-center">
            Waiting for Access Decision...
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="mt-8 grid grid-cols-2 gap-8">
        {/* Card Owner Information */}
        <div className="p-6 bg-white rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">Card Owner Information</h2>
          <div className="flex flex-col items-center">
            {ownerImage ? (
              <img src={ownerImage} alt="Owner" className="rounded-lg w-64 h-64" />
            ) : (
              <div className="bg-gray-300 w-64 h-64 flex items-center justify-center rounded-lg">
                <span className="text-gray-500">Loading...</span>
              </div>
            )}
            <h3 className="mt-4 text-lg text-gray-700">{ownerName}</h3>
          </div>
        </div>

        {/* Card Scanner Information */}
        <div className="p-6 bg-white rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">Card Scanner Information</h2>
          <div className="flex flex-col items-center">
            {aiFrame ? (
              <img src={aiFrame} alt="Processed Frame" className="rounded-lg w-64 h-64" />
            ) : (
              <div className="bg-gray-300 w-64 h-64 flex items-center justify-center rounded-lg">
                <span className="text-gray-500">Waiting for Frame...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
