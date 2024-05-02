import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CameraComponent from '../components/CameraComponent';  // Import the camera component
import Navbar from '../components/Navbar';
const socket = io('http://192.168.0.103:5000');

export default function AddUser() {
  const [userInfo, setUserInfo] = useState({ name: '', cardID: '' });
  const [capturedImage, setCapturedImage] = useState(null);
  const [cardValueReceived, setCardValueReceived] = useState(false);
  const [scannedCardID, setScannedCardID] = useState(null);
  useEffect(() => {
    // Listen for the "scanned_card_id" event
    socket.on("scanned_card_id", (data) => {
      console.log("Received scanned card ID:", data.cardID);
      setScannedCardID(data.cardID);  // Update state with the received CardID
    });

    return () => {
      // Clean up the SocketIO listener
      socket.off("scanned_card_id");
    };
  }, []);  // Only run once when the component is mounted

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleCardValueReceived = () => {
    setCardValueReceived(true);  // Set state to true
  };
  const triggerTrainModel = async () => {
    try {
      const response = await axios.post('http://192.168.0.103:5000/api/train-model');  // Flask API endpoint
      
      if (response.status === 200) {
        alert('Model trained successfully');
      } else {
        console.error('Error training model:', response.data);
      }
    } catch (error) {
      console.error('Error triggering model training:', error);
    }
  };

  const triggerAPI = async () => {
    const formData = new FormData();
    formData.append('image', capturedImage);  // Ensure capturedImage is not null
    formData.append('name', userInfo.name);   // Ensure userInfo.name is not empty
    formData.append('cardID', userInfo.cardID);  // Ensure userInfo.cardID is not empty
    
    // Append binary image data

  
    try {
      const response = await axios.post('http://192.168.0.103:5000/api/add-user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        alert('user datasent to server\nClick ok then scan your new card');
      } else {
        console.error('Error adding card value:', response.data);
      }
    } catch (error) {
      console.error('Error during card value recording:', error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (capturedImage && userInfo.name && userInfo.cardID) {
      const formData = new FormData();
      formData.append('image', capturedImage);
      formData.append('name', userInfo.name);
      formData.append('cardID', userInfo.cardID);

      try {
        const response = await axios.post('/api/add-user', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          alert('User added successfully');
        } else {
          console.error('Error adding user:', response.data);
        }
      } catch (error) {
        console.error('Error during form submission:', error);
      }
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <Navbar /> {/* Include the Navbar at the top */}
      <h1 className="text-2xl font-bold text-center text-black">Add New User</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input 
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            className="w-full border text-black border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Card ID</label>
        
            <p className="text-black">{scannedCardID}</p>  
          
          
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Camera</label>
          <CameraComponent onCapture={setCapturedImage} />
        </div>
        <button
          type="button"
          onClick={() => {
            triggerAPI();  // Trigger API endpoint
            handleCardValueReceived();  // Set state to true
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Record Card Value
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded ml-2"
          onClick={triggerTrainModel}  // Trigger the Flask API endpoint
          disabled={!cardValueReceived}  // Disable until card value is received
        >
          Train Model
        </button>
      </form>
    </div>
  );
}
