import React, { useRef, useState } from 'react';

const CameraComponent = ({ onCapture }) => {
  const videoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  // Start the webcam
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      console.error('Error accessing webcam:', err);
    }
  };

  // Capture an image from the webcam
  const captureImage = () => {
    const video = videoRef.current;
    if (video) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataURL = canvas.toDataURL('image/png');
      setCapturedImage(dataURL);
      onCapture(dataURL);  // Pass the captured image to the parent component
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={startCamera}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Start Camera
      </button>
      <div className="mt-4">
        {capturedImage ? (
          <img src={capturedImage} alt="Captured" className="w-64 h-64" />
        ) : (
          <video ref={videoRef} className="w-64 h-64 bg-gray-300" />
        )}
      </div>
      <button
        onClick={captureImage}
        className="bg-green-600 text-white px-4 py-2 rounded mt-4"
      >
        Capture Image
      </button>
    </div>
  );
};

export default CameraComponent;
