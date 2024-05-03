import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';

// Fetch data from Flask API
export const getServerSideProps = async () => {
  try {
    const response = await fetch('http://192.168.0.103:5000/api/model-history'); // Adjust to your Flask API endpoint

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const modelHistory = await response.json();

    return {
      props: {
        modelHistory,
      },
    };
  } catch (e) {
    console.error('Error fetching model history:', e);

    return {
      props: {
        modelHistory: [],
      },
    };
  }
};

// Component to display the model history
const ModelHistoryPage = ({ modelHistory }) => (
  <div>
    <Navbar /> {/* Include the Navbar at the top */}
  
  <div className="flex items-center justify-center min-h-screen bg-gray-100"> {/* Centered container */}
    
  
    <div className="w-3/4 p-8 bg-white rounded-lg shadow-xl transform hover:scale-105 transition duration-300"> {/* Content block with 3D effect */}
    

      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Model Update History</h1>

      <div className="pb-6 mb-6">
        {modelHistory.length === 0 ? (
          <p className="text-center text-gray-600">No history available.</p>
        ) : (
          <ul className="divide-y divide-gray-300">
            {modelHistory.map((record) => (
              <li key={record.id} className="py-4 flex justify-between">
                <div className="w-1/2">
                  <p className="text-lg font-semibold text-gray-800">Model ID: {record.id}</p>
                </div>
                <div className="w-1/2 text-right">
                  <p className="text-gray-600">Updated at: {record.datetime}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="text-center">
        <Link href="/">
          <span className="inline-flex items-center text-blue-500 hover:text-blue-700 transition">
            &larr; Back to Home
          </span>
        </Link>
      </div>
    </div>
  </div>
  </div>
);

export default ModelHistoryPage;
