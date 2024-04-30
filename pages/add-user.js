import { useState } from 'react';
import axios from 'axios';
import CameraComponent from '../components/CameraComponent';  // Import the camera component

export default function AddUser() {
  const [userInfo, setUserInfo] = useState({ name: '', cardID: '' });
  const [capturedImage, setCapturedImage] = useState(null);
  const [cardValueReceived, setCardValueReceived] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleCardValueReceived = () => {
    setCardValueReceived(true);  // Set state to true
  };

  const triggerAPI = async () => {
    const formData = new FormData();
    formData.append('image', capturedImage);  // Ensure capturedImage is not null
    formData.append('name', userInfo.name);   // Ensure userInfo.name is not empty
    formData.append('cardID', userInfo.cardID);  // Ensure userInfo.cardID is not empty
  
    try {
      const response = await axios.post('http://192.168.0.103:5000/api/add-user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        alert('Card value recorded successfully');
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
      <h1 className="text-2xl font-bold text-center">Add New User</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Card ID</label>
          <input
            type="text"
            name="cardID"
            value={userInfo.cardID}  // Corrected syntax
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
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
          disabled={!cardValueReceived}  // Disable until card value is received
        >
          Train Model
        </button>
      </form>
    </div>
  );
}
