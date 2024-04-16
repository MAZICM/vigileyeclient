// TrainModelButton.js

import { useState } from 'react';

const TrainModelButton = () => {
  const [loading, setLoading] = useState(false);

  const trainModel = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/train_model', { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to train model');
      }
      alert('Model trained successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to train model');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={trainModel}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
        loading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
      }`}
    >
      {loading ? 'Training Model...' : 'Train Model'}
    </button>
  );
};

export default TrainModelButton;
