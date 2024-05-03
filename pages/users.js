import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function ViewUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://192.168.0.103:5000/api/get-users');
        setUsers(response.data);  // Store user data in state
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();  // Fetch user data when the component mounts
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-black">
      <Navbar /> {/* Include the Navbar at the top */}
      <h1 className="text-2xl font-bold text-center text-black">Users Collection</h1>
      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow-md text-black">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-black">Name</th>
                <th className="px-4 py-2 text-left text-black">Card ID</th>
                <th className="px-4 py-2 text-left text-black">Filename</th>
                <th className="px-4 py-2 text-left text-black">Image</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="bg-gray-100">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.cardID}</td>
                  <td className="px-4 py-2">{user.filename}</td>
                  <td className="px-4 py-2">
                    {user.image_data ? (
                      <img
                        src={`data:image/png;base64,${user.image_data}`}
                        alt={user.filename}
                        className="w-16 h-16 rounded"
                      />
                    ) : (
                      'No Image Available'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-black ">No users found.</p>
      )}
    </div>
  );
}
