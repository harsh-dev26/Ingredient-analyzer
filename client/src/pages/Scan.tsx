import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Separator } from '@/components/ui/separator';
import ImageCapture from '@/components/ImageCapture';
import ImagePreview from '@/components/ImagePreview';
import { useScan } from '@/context/ScanContext';
import { Upload } from 'lucide-react';

export default function Scan() {
  const { image, setImage, currentStep, setCurrentStep } = useScan();
  const [, setLocation] = useLocation();
  
  // Reset to upload step when navigating to this page
  useEffect(() => {
    setCurrentStep('upload');
  }, [setCurrentStep]);
  
  // Redirect to processing page if currentStep changes to 'processing'
  useEffect(() => {
    if (currentStep === 'processing') {
      setLocation('/processing');
    } else if (currentStep === 'results') {
      setLocation('/results');
    }
  }, [currentStep, setLocation]);
  
  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };
  
  // Handle drag and drop
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Scan Ingredients Label</h1>
      <p className="text-center text-gray-600 mb-8">
        Take a clear photo of the ingredients list or upload an existing image
      </p>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        {/* Image Capture Component */}
        <ImageCapture />
        
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-white text-sm text-gray-500">OR</span>
          </div>
        </div>
        
        {/* File Upload Component */}
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Upload an Image</h2>
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 h-48 hover:bg-gray-50 cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <Upload className="h-8 w-8 text-gray-400 mb-3" />
            <p className="text-sm text-gray-500 mb-2">Drag and drop an image or click to browse</p>
            <p className="text-xs text-gray-400">Supported formats: JPG, PNG, HEIC</p>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              id="file-upload" 
              onChange={handleFileUpload}
            />
          </div>
        </div>
      </div>
      
      {/* Image Preview Component */}
      <ImagePreview />
    </div>
  );
}
