import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Navbar from '../components/Navbar'; // Import the Navbar component
export default function Home() {
  const [ownerName, setOwnerName] = useState('Loading...');
  const [ownerImage, setOwnerImage] = useState(null);
  const [cardID, setCardID] = useState('');
  const [aiFrame, setAiFrame] = useState(null);
  const [accessStatus, setAccessStatus] = useState(null);
  const [accessReason, setAccessReason] = useState(null);


  useEffect(() => {
    const socket = io('http://192.168.0.103:5000');  // Update with your server's address and port

    socket.on('latest_cardID', ({ cardID, ownerName, ownerImage }) => {
      setCardID(cardID);
      setOwnerName(ownerName);
      if (ownerImage) {
        setOwnerImage(`data:image/png;base64,${ownerImage}`);  // Update image with base64 data
      } else {
        setOwnerImage(null);
      }
      console.log('Received latest_cardID:', cardID, ownerName, ownerImage);
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
          console.log("image received");
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
      
    
      <Navbar /> {/* Include the Navbar at the top */}
      
    
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
              // eslint-disable-next-line @next/next/no-img-element
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
