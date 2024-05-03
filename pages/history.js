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
  <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
    {/* Navigation Bar */}
    <Navbar /> {/* Include the Navbar at the top */}

    <h1 className="text-2xl font-bold text-center mb-6 text-black">Model Update History</h1>

    <div className="pb-6 mb-6">
      {modelHistory.length === 0 ? (
        <p className="text-center text-black">No history available.</p>
      ) : (
        <ul className="divide-y divide-gray-300">
          {modelHistory.map((record) => (
            <li key={record.id} className="py-4 flex">
              {/* Two columns for model ID and training date */}
              <div className="w-1/2">
                {/* First column */}
                <p className="text-lg font-semibold text-black">Model ID: {record.id}</p>
              </div>
              <div className="w-1/2 text-right">
                {/* Second column, aligned right */}
                <p className="text-black">Updated at: {record.datetime}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>

    <div className="text-center">
      <Link href="/">
        <span className="inline-flex items-center text-blue-500 hover:text-blue-700 transition">
          &larr; Back to Home {/* Back to Home with hover effect */}
        </span>
      </Link>
    </div>
  </div>
);

export default ModelHistoryPage;
