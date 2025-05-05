import React from 'react';
import { AlertCircle, InfoIcon, Share, Download, History, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScan } from '@/context/ScanContext';
import IngredientDetail from './IngredientDetail';
import { RiskLevel } from '@/lib/ingredientsDatabase';

export default function ResultsDisplay() {
  const { 
    imagePreview, 
    ocrText, 
    analysisResults, 
    safetyScore, 
    ingredientCounts 
  } = useScan();

  // Filter results by risk level
  const getIngredientsByRiskLevel = (riskLevel: RiskLevel) => {
    return analysisResults.filter(
      result => result.matchedIngredient && result.matchedIngredient.riskLevel === riskLevel
    );
  };

  // Get safe ingredients (no or low risk)
  const safeIngredients = analysisResults.filter(
    result => result.matchedIngredient && 
    (result.matchedIngredient.riskLevel === RiskLevel.SAFE || result.matchedIngredient.riskLevel === RiskLevel.LOW)
  );

  // High risk ingredients
  const highRiskIngredients = getIngredientsByRiskLevel(RiskLevel.HIGH);
  
  // Moderate risk ingredients
  const moderateRiskIngredients = getIngredientsByRiskLevel(RiskLevel.MODERATE);

  // Total harmful ingredients
  const totalHarmfulCount = (ingredientCounts?.[RiskLevel.HIGH] || 0) + 
                            (ingredientCounts?.[RiskLevel.MODERATE] || 0);

  // Determine safety color
  const getSafetyColor = (score: number) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Show more safe ingredients
  const [showAllSafe, setShowAllSafe] = React.useState(false);
  const visibleSafeIngredients = showAllSafe ? safeIngredients : safeIngredients.slice(0, 5);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Ingredients Analysis Results</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-start">
            {/* Left Column - Image and OCR Text */}
            <div className="w-full sm:w-1/3 mr-0 sm:mr-6 mb-6 sm:mb-0">
              <div className="rounded-lg overflow-hidden border border-gray-200">
                {imagePreview ? (
                  <img src={imagePreview} alt="Scanned product label" className="w-full h-auto" />
                ) : (
                  <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-400">No image available</p>
                  </div>
                )}
              </div>
              <div className="mt-3">
                <h3 className="text-sm font-medium text-gray-500">Detected Text:</h3>
                <div className="mt-1 p-2 bg-gray-50 rounded text-xs text-gray-600 max-h-40 overflow-y-auto">
                  <p>{ocrText || "No text detected"}</p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Analysis Summary */}
            <div className="flex-1 w-full">
              <div className="flex items-center mb-5">
                <div className="flex-shrink-0 w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Analysis Summary</h2>
                  <p className={`font-medium ${totalHarmfulCount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {totalHarmfulCount > 0 
                      ? `${totalHarmfulCount} potentially harmful ${totalHarmfulCount === 1 ? 'ingredient' : 'ingredients'} found` 
                      : 'No harmful ingredients found'}
                  </p>
                </div>
              </div>

              {/* Overall Safety Score */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Product Safety Score</h3>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-4 mr-4">
                    <div 
                      className={`h-4 rounded-full ${getSafetyColor(safetyScore)}`} 
                      style={{ width: `${Math.max(safetyScore * 10, 5)}%` }}
                    ></div>
                  </div>
                  <span className="text-lg font-bold text-gray-800">{safetyScore.toFixed(1)}/10</span>
                </div>
              </div>

              {/* Ingredients Categories */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="text-xs font-medium text-red-800 mb-1">High Concern</div>
                  <div className="text-xl font-bold text-red-600">{ingredientCounts?.[RiskLevel.HIGH] || 0}</div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="text-xs font-medium text-yellow-800 mb-1">Moderate Concern</div>
                  <div className="text-xl font-bold text-yellow-600">{ingredientCounts?.[RiskLevel.MODERATE] || 0}</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-xs font-medium text-green-800 mb-1">Low/No Concern</div>
                  <div className="text-xl font-bold text-green-600">
                    {(ingredientCounts?.[RiskLevel.LOW] || 0) + (ingredientCounts?.[RiskLevel.SAFE] || 0)}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2">
                <Button variant="ghost" size="sm" className="inline-flex items-center text-gray-600">
                  <Share className="h-4 w-4 mr-1" /> Share
                </Button>
                <Button variant="ghost" size="sm" className="inline-flex items-center text-gray-600">
                  <Download className="h-4 w-4 mr-1" /> Save PDF
                </Button>
                <Button variant="ghost" size="sm" className="inline-flex items-center text-gray-600">
                  <History className="h-4 w-4 mr-1" /> View History
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Harmful Ingredients Section */}
      {(highRiskIngredients.length > 0 || moderateRiskIngredients.length > 0) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Potentially Harmful Ingredients
          </h2>
          
          {/* High Risk Ingredients */}
          {highRiskIngredients.map((result, index) => (
            <IngredientDetail
              key={`high-${index}`}
              ingredientResult={result}
            />
          ))}
          
          {/* Moderate Risk Ingredients */}
          {moderateRiskIngredients.map((result, index) => (
            <IngredientDetail
              key={`moderate-${index}`}
              ingredientResult={result}
            />
          ))}
        </div>
      )}

      {/* Other Ingredients Section */}
      {safeIngredients.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Other Ingredients</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-5">
              <p className="text-gray-600 mb-4">
                These ingredients either have no known health concerns or pose minimal risk at typical concentrations.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibleSafeIngredients.map((result, index) => (
                  <div key={`safe-${index}`} className="flex items-center">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-800">
                        {result.matchedIngredient ? result.matchedIngredient.name : result.ingredient}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {result.matchedIngredient?.category || "Ingredient"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {safeIngredients.length > 5 && (
                <Button 
                  variant="ghost" 
                  onClick={() => setShowAllSafe(!showAllSafe)} 
                  className="mt-4 text-primary-600 hover:text-primary-800"
                >
                  {showAllSafe ? "Show Less" : "See All Safe Ingredients"}
                  <ArrowDown className={`ml-1 h-4 w-4 transition-transform ${showAllSafe ? 'rotate-180' : ''}`} />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Recommendations Section */}
      {(highRiskIngredients.length > 0 || moderateRiskIngredients.length > 0) && (
        <div className="mt-8 bg-primary-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-primary-800 mb-4">Healthier Alternatives</h2>
          <p className="text-primary-700 mb-4">
            Based on your scan, here are some safer alternatives you might consider:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highRiskIngredients.includes(result => result.matchedIngredient?.name.includes('methylisothiazolinone')) && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Leaf className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-md font-semibold text-gray-800">Natural Preservative Systems</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Instead of Methylisothiazolinone, look for products with natural preservatives like radish root ferment filtrate, sodium benzoate, or potassium sorbate.
                </p>
              </div>
            )}
            
            {highRiskIngredients.includes(result => result.matchedIngredient?.name.includes('sodium laureth sulfate')) && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Plant className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-md font-semibold text-gray-800">Gentler Surfactants</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Replace Sodium Laureth Sulfate with milder cleansing agents like coco glucoside, sodium cocoyl isethionate, or decyl glucoside.
                </p>
              </div>
            )}
            
            {moderateRiskIngredients.includes(result => result.matchedIngredient?.name.includes('fragrance')) && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Droplet className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-md font-semibold text-gray-800">Fragrance-Free Options</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Look for products labeled "fragrance-free" or that use natural essential oils instead of synthetic fragrances when a scent is desired.
                </p>
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <InfoIcon className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-md font-semibold text-gray-800">Read Labels Carefully</h3>
              </div>
              <p className="text-sm text-gray-600">
                Always check product labels for transparency about ingredients. Companies that list all ingredients clearly often have less to hide.
              </p>
            </div>
          </div>
          
          <Button className="mt-6">
            <Search className="mr-2 h-4 w-4" />
            Browse Safer Products
          </Button>
        </div>
      )}
    </div>
  );
}

// Additional icons for this component
function CheckCircle(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}

function Leaf(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M11 20A7 7 0 0 1 9.8 8.8L2 2l6.8 7.8A7 7 0 0 1 20 11a7 7 0 0 1-9 9z"></path>
      <path d="M2 21 17 6"></path>
    </svg>
  );
}

function Plant(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M22 9 L12 2 2 9 L12 16 Z"></path>
      <path d="M12 16 L12 22"></path>
      <path d="M8 22 L16 22"></path>
    </svg>
  );
}

function Droplet(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
    </svg>
  );
}

function Search(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
}
