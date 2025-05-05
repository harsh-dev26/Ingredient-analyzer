import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import ResultsDisplay from '@/components/ResultsDisplay';
import { useScan } from '@/context/ScanContext';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function Results() {
  const { analysisResults, currentStep, setCurrentStep } = useScan();
  const [, setLocation] = useLocation();
  
  // Redirect if no results are available
  useEffect(() => {
    if (analysisResults.length === 0 && currentStep !== 'results') {
      setLocation('/scan');
    }
  }, [analysisResults, currentStep, setLocation]);
  
  // Handle scanning again
  const handleNewScan = () => {
    setCurrentStep('upload');
    setLocation('/scan');
  };

  // If no results are available, show error state
  if (analysisResults.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className="rounded-full bg-red-100 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">No Analysis Results</h2>
        <p className="text-gray-600 mb-6">
          You haven't performed an ingredient scan yet or the results are no longer available.
        </p>
        <Button onClick={handleNewScan} className="inline-flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go to Scanner
        </Button>
      </div>
    );
  }

  return (
    <div>
      <ResultsDisplay />
      
      <div className="mt-8 text-center">
        <Button onClick={handleNewScan} variant="outline" className="inline-flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Scan Another Product
        </Button>
      </div>
    </div>
  );
}
