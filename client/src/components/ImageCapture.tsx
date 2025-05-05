import React, { useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScan } from '@/context/ScanContext';

export default function ImageCapture() {
  const { setImage } = useScan();
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  // Check if the device has a camera
  const hasGetUserMedia = !!(
    navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia
  );

  // Start the camera
  const startCamera = async () => {
    if (!hasGetUserMedia) {
      setError("Your browser doesn't support camera access");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        setError(null);
      }
    } catch (err) {
      setCameraActive(false);
      setError("Couldn't access camera. Please check permissions.");
      console.error("Camera access error:", err);
    }
  };

  // Capture the image from the video stream
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame to the canvas
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas to a blob
    canvas.toBlob((blob) => {
      if (blob) {
        // Create a File object from the blob
        const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
        setImage(file);

        // Stop the camera stream
        stopCamera();
      }
    }, 'image/jpeg', 0.9);
  };

  // Stop the camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Take a Photo</h2>
      
      {cameraActive ? (
        <div className="relative">
          <video 
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
            <Button 
              variant="destructive" 
              onClick={stopCamera}
              className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
            >
              <X className="h-6 w-6" />
            </Button>
            <Button 
              variant="default"
              onClick={captureImage}
              className="rounded-full w-12 h-12 p-0 flex items-center justify-center bg-white text-gray-900 border border-gray-300"
            >
              <span className="block w-8 h-8 rounded-full border-2 border-gray-900"></span>
            </Button>
          </div>
          {/* Hidden canvas for capturing images */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 h-64">
          <Camera className="h-10 w-10 text-gray-400 mb-4" />
          <p className="text-sm text-gray-500 mb-4 text-center">
            Position the ingredients list in the frame and take a clear photo
          </p>
          <Button 
            onClick={startCamera}
            variant="secondary"
            className="inline-flex items-center justify-center"
          >
            <Camera className="mr-2 h-4 w-4" />
            Open Camera
          </Button>
          {error && (
            <p className="mt-3 text-sm text-red-600">{error}</p>
          )}
        </div>
      )}
    </div>
  );
}

// X icon for the close button
function X(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}
