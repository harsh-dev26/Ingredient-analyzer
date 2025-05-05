import React from 'react';
import { InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnalysisResult, RiskLevel } from '@/lib/ingredientsDatabase';

interface IngredientDetailProps {
  ingredientResult: AnalysisResult;
}

export default function IngredientDetail({ ingredientResult }: IngredientDetailProps) {
  const { matchedIngredient } = ingredientResult;
  
  if (!matchedIngredient) return null;
  
  // Determine border color and badge color based on risk level
  const getBorderColor = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case RiskLevel.HIGH:
        return 'border-red-500';
      case RiskLevel.MODERATE:
        return 'border-yellow-500';
      case RiskLevel.LOW:
        return 'border-blue-500';
      default:
        return 'border-green-500';
    }
  };
  
  const getBadgeColor = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case RiskLevel.HIGH:
        return 'bg-red-100 text-red-800';
      case RiskLevel.MODERATE:
        return 'bg-yellow-100 text-yellow-800';
      case RiskLevel.LOW:
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };
  
  const getRiskLevelText = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case RiskLevel.HIGH:
        return 'High Concern';
      case RiskLevel.MODERATE:
        return 'Moderate Concern';
      case RiskLevel.LOW:
        return 'Low Concern';
      default:
        return 'Safe';
    }
  };
  
  const getConcernColor = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case RiskLevel.HIGH:
        return 'bg-red-50 text-red-700';
      case RiskLevel.MODERATE:
        return 'bg-yellow-50 text-yellow-700';
      case RiskLevel.LOW:
        return 'bg-blue-50 text-blue-700';
      default:
        return 'bg-green-50 text-green-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div className={`border-l-4 ${getBorderColor(matchedIngredient.riskLevel)}`}>
        <div className="p-5">
          <div className="flex items-start">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-800 capitalize">
                  {matchedIngredient.name}
                </h3>
                <span className={`px-2 py-0.5 ${getBadgeColor(matchedIngredient.riskLevel)} text-xs font-medium rounded`}>
                  {getRiskLevelText(matchedIngredient.riskLevel)}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{matchedIngredient.description}</p>
              
              {matchedIngredient.healthConcerns.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Health Concerns:</h4>
                  <div className="flex flex-wrap gap-2">
                    {matchedIngredient.healthConcerns.map((concern, index) => (
                      <span 
                        key={index} 
                        className={`px-2 py-1 ${getConcernColor(matchedIngredient.riskLevel)} text-xs rounded-full`}
                        title={concern.description}
                      >
                        {concern.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {matchedIngredient.alternativeNames.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Alternative Names:</h4>
                  <p className="text-sm text-gray-600">
                    {matchedIngredient.alternativeNames.join(', ')}
                  </p>
                </div>
              )}
            </div>
            
            <div className="ml-4 flex-shrink-0 hidden sm:block">
              <Button variant="outline" size="sm" className="h-8">
                <InfoIcon className="h-4 w-4 mr-1" />
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
