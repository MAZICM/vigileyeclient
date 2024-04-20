import { useState, useEffect } from 'react';

export default function Home() {
  const [ownerImage, setOwnerImage] = useState(null);
  const cardID = '1111'; // Provide the card ID you want to fetch the image for

  useEffect(() => {
    // Fetch the owner image based on the card ID
    fetch(`http://192.168.11.154:5000/api/getOwnerImage?cardID=${cardID}`)
      .then(response => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error('Network response was not ok.');
      })
      .then(blob => {
        // Create a URL for the blob and set it as the owner image
        const imageUrl = URL.createObjectURL(blob);
        setOwnerImage(imageUrl);
      })
      .catch(error => console.error('Error fetching image:', error));
  }, [cardID]);

  return (
    <div>
      <h1>Owner Image</h1>
      {ownerImage && <img src={ownerImage} alt="Owner" />}
    </div>
  );
}
