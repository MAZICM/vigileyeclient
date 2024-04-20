// pages/api/getOwnerImage.js

export default async function handler(req, res) {
  const { cardID } = req.query;

  try {
    const response = await fetch(`http://localhost:5000/api/getOwnerImage?cardID=${cardID}`);
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    const imageBlob = await response.blob();
    const imageUrl = URL.createObjectURL(imageBlob);

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
