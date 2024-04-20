// pages/api/getOwnerImage.js

export default async function handler(req, res) {
  const { cardID } = req.query;

  try {
    const response = await fetch(`http://192.168.11.154:5000/api/getOwnerImage?cardID=${cardID}`);
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    const arrayBuffer = await response.arrayBuffer(); // Get response data as ArrayBuffer
    const base64Image = Buffer.from(arrayBuffer).toString('base64'); // Convert ArrayBuffer to base64 string

    res.status(200).json({ base64Image });
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
