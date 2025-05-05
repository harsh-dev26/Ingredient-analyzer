import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Ingredient, 
  RiskLevel 
} from '@/lib/ingredientsDatabase';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from '@/components/ui/separator';
import LoadingState from './LoadingState';

// Define the API response type
interface IngredientsResponse {
  success: boolean;
  count: number;
  ingredients: Ingredient[];
}

export default function UnsafeIngredientsList() {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Fetch unsafe ingredients
  const { data, isLoading, error } = useQuery<IngredientsResponse>({
    queryKey: ['/api/ingredients/unsafe'],
    staleTime: 60000, // 1 minute
  });
  
  // Filtered ingredients based on active tab
  const filteredIngredients = data?.ingredients?.filter((ingredient: Ingredient) => {
    if (activeTab === "all") return true;
    return ingredient.riskLevel === activeTab;
  }) || [];
  
  // Get badge color based on risk level
  const getBadgeColor = (riskLevel: RiskLevel): "default" | "destructive" | "warning" | "secondary" | "outline" => {
    switch (riskLevel) {
      case RiskLevel.HIGH:
        return "destructive";
      case RiskLevel.MODERATE:
        return "warning"; // Now using our custom warning variant
      case RiskLevel.LOW:
        return "secondary";
      case RiskLevel.SAFE:
        return "outline";
      default:
        return "default";
    }
  };
  
  // Get risk level text
  const getRiskLevelText = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case RiskLevel.HIGH:
        return "High Risk";
      case RiskLevel.MODERATE:
        return "Moderate Risk";
      case RiskLevel.LOW:
        return "Low Risk";
      case RiskLevel.SAFE:
        return "Safe";
      default:
        return "Unknown";
    }
  };
  
  if (isLoading) return <LoadingState />;
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h3 className="text-xl font-medium text-destructive mb-2">Error Loading Ingredients</h3>
        <p className="text-muted-foreground">
          There was a problem loading the ingredients database. Please try again later.
        </p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Ingredients Database</h2>
      
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="high">High Risk</TabsTrigger>
          <TabsTrigger value="moderate">Moderate Risk</TabsTrigger>
          <TabsTrigger value="low">Low Risk</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredIngredients.length > 0 ? (
              filteredIngredients.map((ingredient: Ingredient) => (
                <Card key={ingredient.name} className="p-4 h-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{ingredient.name}</h3>
                      <Badge variant={getBadgeColor(ingredient.riskLevel)} className="mt-1">
                        {getRiskLevelText(ingredient.riskLevel)}
                      </Badge>
                      {ingredient.category && (
                        <Badge variant="outline" className="ml-2 mt-1">
                          {ingredient.category}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <p className="mt-3 text-muted-foreground">{ingredient.description}</p>
                  
                  {ingredient.alternativeNames && ingredient.alternativeNames.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium">Also known as:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {ingredient.alternativeNames.map(name => (
                          <Badge key={name} variant="secondary" className="text-xs">
                            {name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {ingredient.healthConcerns && ingredient.healthConcerns.length > 0 && (
                    <div className="mt-4">
                      <Accordion type="single" collapsible>
                        <AccordionItem value="health-concerns">
                          <AccordionTrigger className="text-sm font-medium">
                            Health Concerns
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2">
                              {ingredient.healthConcerns.map(concern => (
                                <li key={concern.name}>
                                  <p className="font-medium text-sm">{concern.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {concern.description}
                                  </p>
                                  <Separator className="my-2" />
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  )}
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center p-8 border rounded-lg">
                <p className="text-lg text-muted-foreground">
                  No ingredients found for the selected filter.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}