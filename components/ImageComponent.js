import { useEffect, useState } from 'react';
import axios from 'axios';

function ImageComponent({ cardID }) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const response = await axios.get(`/api/getOwnerImage?cardID=${cardID}`);
                setImageUrl(response.data.imageUrl);
            } catch (error) {
                console.error('Error fetching image URL:', error);
            }
        };

        fetchImageUrl();
    }, [cardID]);

    return <img src={imageUrl} alt="Owner's Image" />;
}

export default ImageComponent;
