import React from 'react';
import { RefreshCw, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScan } from '@/context/ScanContext';

export default function ImagePreview() {
  const { imagePreview, resetScan, startProcessing, isProcessing } = useScan();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Image Preview</h2>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
          {imagePreview ? (
            <img 
              src={imagePreview} 
              alt="Preview of ingredient label" 
              className="h-full w-full object-contain"
            />
          ) : (
            <p className="text-gray-400">No image selected</p>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-end">
        <Button
          variant="outline"
          onClick={resetScan}
          disabled={isProcessing || !imagePreview}
          className="inline-flex items-center justify-center"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Retake
        </Button>
        <Button
          onClick={startProcessing}
          disabled={isProcessing || !imagePreview}
          className="inline-flex items-center justify-center"
        >
          <Search className="mr-2 h-4 w-4" />
          Analyze Ingredients
        </Button>
      </div>
    </div>
  );
}
