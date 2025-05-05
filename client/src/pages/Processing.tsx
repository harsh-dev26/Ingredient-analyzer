import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import LoadingState from '@/components/LoadingState';
import { useScan } from '@/context/ScanContext';

export default function Processing() {
  const { currentStep, isProcessing } = useScan();
  const [, setLocation] = useLocation();
  
  // Redirect based on current step
  useEffect(() => {
    if (currentStep === 'upload') {
      setLocation('/scan');
    } else if (currentStep === 'results' && !isProcessing) {
      setLocation('/results');
    }
  }, [currentStep, isProcessing, setLocation]);

  return (
    <div>
      <LoadingState />
    </div>
  );
}
