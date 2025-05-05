import React, { createContext, useState, useContext, ReactNode } from 'react';
import { 
  AnalysisResult, 
  Ingredient, 
  analyzeIngredients, 
  calculateSafetyScore,
  getIngredientCountsByRiskLevel,
  RiskLevel
} from '@/lib/ingredientsDatabase';
import { performOCR, parseIngredients } from '@/lib/ocr';

interface ScanContextType {
  // Image state
  image: File | null;
  imagePreview: string | null;
  setImage: (file: File | null) => void;
  
  // OCR processing state
  isProcessing: boolean;
  ocrText: string | null;
  confidence: number | null;
  extractedIngredients: string[];
  
  // Analysis results
  analysisResults: AnalysisResult[];
  safetyScore: number;
  ingredientCounts: Record<RiskLevel, number> | null;
  
  // Processing methods
  startProcessing: () => Promise<void>;
  resetScan: () => void;
  
  // Current step
  currentStep: 'upload' | 'processing' | 'results';
  setCurrentStep: (step: 'upload' | 'processing' | 'results') => void;
  
  // Error handling
  error: string | null;
}

const ScanContext = createContext<ScanContextType | undefined>(undefined);

export function ScanProvider({ children }: { children: ReactNode }) {
  // Image state
  const [image, setImageState] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // OCR processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrText, setOcrText] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [extractedIngredients, setExtractedIngredients] = useState<string[]>([]);
  
  // Analysis results
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [safetyScore, setSafetyScore] = useState<number>(0);
  const [ingredientCounts, setIngredientCounts] = useState<Record<RiskLevel, number> | null>(null);
  
  // Current step state
  const [currentStep, setCurrentStep] = useState<'upload' | 'processing' | 'results'>('upload');
  
  // Error handling
  const [error, setError] = useState<string | null>(null);
  
  // Set image and create preview URL
  const setImage = (file: File | null) => {
    setImageState(file);
    
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
    
    // Reset any previous results
    setOcrText(null);
    setConfidence(null);
    setExtractedIngredients([]);
    setAnalysisResults([]);
    setError(null);
  };
  
  // Start processing the image
  const startProcessing = async () => {
    if (!image) {
      setError('No image selected');
      return;
    }
    
    setIsProcessing(true);
    setCurrentStep('processing');
    setError(null);
    
    try {
      // Perform OCR on the image
      const ocrResult = await performOCR(image);
      setOcrText(ocrResult.text);
      setConfidence(ocrResult.confidence);
      
      // Parse ingredients from the OCR text
      const ingredients = parseIngredients(ocrResult.text);
      setExtractedIngredients(ingredients);
      
      // Analyze the ingredients
      const results = analyzeIngredients(ingredients);
      setAnalysisResults(results);
      
      // Calculate safety score
      const score = calculateSafetyScore(results);
      setSafetyScore(score);
      
      // Get ingredient counts by risk level
      const counts = getIngredientCountsByRiskLevel(results);
      setIngredientCounts(counts);
      
      // Move to results page
      setCurrentStep('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Reset the scan
  const resetScan = () => {
    setImage(null);
    setImagePreview(null);
    setOcrText(null);
    setConfidence(null);
    setExtractedIngredients([]);
    setAnalysisResults([]);
    setCurrentStep('upload');
    setError(null);
  };
  
  const value = {
    image,
    imagePreview,
    setImage,
    isProcessing,
    ocrText,
    confidence,
    extractedIngredients,
    analysisResults,
    safetyScore,
    ingredientCounts,
    startProcessing,
    resetScan,
    currentStep,
    setCurrentStep,
    error
  };
  
  return <ScanContext.Provider value={value}>{children}</ScanContext.Provider>;
}

// Custom hook to use the scan context
export function useScan() {
  const context = useContext(ScanContext);
  if (context === undefined) {
    throw new Error('useScan must be used within a ScanProvider');
  }
  return context;
}
