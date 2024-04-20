import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { cardID } = req.query;

  try {
    // Send a GET request to the Flask server to fetch the owner name
    const response = await axios.get(`http://192.168.11.154:5000/api/getOwnerName?cardID=${cardID}`);

    // Extract the owner name from the response and send it back to the client
    const { ownerName } = response.data;
    res.status(200).json({ ownerName });
  } catch (error) {
    console.error('Error fetching owner name:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}