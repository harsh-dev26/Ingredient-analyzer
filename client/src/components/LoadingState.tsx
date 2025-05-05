import React, { useState, useEffect } from 'react';
import { FileSearch, CheckCircle, Clock, Loader2 } from 'lucide-react';
import { useScan } from '@/context/ScanContext';
import { Progress } from '@/components/ui/progress';

export default function LoadingState() {
  const { isProcessing } = useScan();
  const [progressValue, setProgressValue] = useState(0);
  const [step, setStep] = useState(1);

  // Simulate progress for better UX
  useEffect(() => {
    if (!isProcessing) return;

    const simulateProgress = () => {
      setProgressValue(prev => {
        // Increase progress at different rates based on current value
        if (prev < 25) return prev + 2;
        if (prev < 50) return prev + 1;
        if (prev < 75) return prev + 0.5;
        if (prev < 95) return prev + 0.2;
        return prev;
      });
    };

    const interval = setInterval(simulateProgress, 100);
    
    // Update processing step based on progress
    if (progressValue > 25 && step === 1) setStep(2);
    if (progressValue > 50 && step === 2) setStep(3);
    if (progressValue > 85 && step === 3) setStep(4);

    return () => clearInterval(interval);
  }, [isProcessing, progressValue, step]);

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Analyzing Ingredients</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FileSearch className="h-8 w-8 text-primary" />
            </div>
          </div>
          
          <div className="w-full max-w-md">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Processing your image</h2>
            <Progress value={progressValue} className="mb-6 h-2.5" />
            
            <div className="space-y-3">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">Extracting text from image</span>
              </div>
              
              <div className="flex items-center">
                {step >= 2 ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <Loader2 className="h-5 w-5 text-primary mr-2 animate-spin" />
                )}
                <span className="text-sm text-gray-600">Identifying ingredients</span>
              </div>
              
              <div className="flex items-center">
                {step >= 3 ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  step === 2 ? (
                    <Loader2 className="h-5 w-5 text-primary mr-2 animate-spin" />
                  ) : (
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                  )
                )}
                <span className={`text-sm ${step >= 2 ? 'text-gray-600' : 'text-gray-400'}`}>
                  Checking against ingredient database
                </span>
              </div>
              
              <div className="flex items-center">
                {step >= 4 ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  step === 3 ? (
                    <Loader2 className="h-5 w-5 text-primary mr-2 animate-spin" />
                  ) : (
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                  )
                )}
                <span className={`text-sm ${step >= 3 ? 'text-gray-600' : 'text-gray-400'}`}>
                  Generating health impact report
                </span>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-6">This may take a few moments</p>
          </div>
        </div>
      </div>
    </div>
  );
}
