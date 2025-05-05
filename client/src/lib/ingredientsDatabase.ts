// Define ingredient risk levels
export enum RiskLevel {
  HIGH = "high",
  MODERATE = "moderate",
  LOW = "low",
  SAFE = "safe"
}

// Define interface for ingredient health concerns
export interface HealthConcern {
  name: string;
  description: string;
}

// Define interface for ingredients
export interface Ingredient {
  name: string;
  alternativeNames: string[];
  riskLevel: RiskLevel;
  description: string;
  healthConcerns: HealthConcern[];
  category?: string;
}

// Define interface for analysis results
export interface AnalysisResult {
  ingredient: string;
  matchedIngredient: Ingredient | null;
  confidence: number;
}

// Sample database of potentially harmful ingredients
export const harmfulIngredients: Ingredient[] = [
  {
    name: "methylisothiazolinone",
    alternativeNames: ["MIT", "MI", "2-methyl-4-isothiazolin-3-one"],
    riskLevel: RiskLevel.HIGH,
    description: "A synthetic preservative that can cause allergic reactions and skin irritation. May be neurotoxic at certain concentrations.",
    healthConcerns: [
      { name: "Allergic Reactions", description: "Can cause skin rashes and allergic contact dermatitis" },
      { name: "Skin Irritation", description: "May cause redness, itching, and inflammation" },
      { name: "Potential Neurotoxicity", description: "Studies suggest possible neurotoxic effects at high concentrations" }
    ],
    category: "Preservative"
  },
  {
    name: "sodium laureth sulfate",
    alternativeNames: ["SLES", "sodium lauryl ether sulfate"],
    riskLevel: RiskLevel.HIGH,
    description: "A surfactant and detergent that can cause skin irritation and is often contaminated with ethylene oxide and 1,4-dioxane, which are carcinogens.",
    healthConcerns: [
      { name: "Skin Irritation", description: "Can cause dryness and irritation, especially with prolonged exposure" },
      { name: "Contamination Risks", description: "Often contaminated with ethylene oxide and 1,4-dioxane (carcinogens)" },
      { name: "Environmental Toxicity", description: "Harmful to aquatic organisms and can cause long-term adverse effects" }
    ],
    category: "Surfactant"
  },
  {
    name: "fragrance",
    alternativeNames: ["parfum", "aroma", "essential oil blend"],
    riskLevel: RiskLevel.MODERATE,
    description: "A blanket term that can include dozens or hundreds of chemicals, many of which can trigger allergies and asthma. Companies aren't required to disclose specific fragrance ingredients.",
    healthConcerns: [
      { name: "Allergic Reactions", description: "Common trigger for skin allergies and contact dermatitis" },
      { name: "Hormone Disruption", description: "Some fragrance compounds may disrupt hormonal balance" },
      { name: "Asthma Triggers", description: "Can exacerbate respiratory conditions like asthma" }
    ],
    category: "Fragrance"
  },
  {
    name: "parabens",
    alternativeNames: ["methylparaben", "propylparaben", "butylparaben", "ethylparaben"],
    riskLevel: RiskLevel.MODERATE,
    description: "Preservatives that can mimic estrogen and may disrupt hormone function.",
    healthConcerns: [
      { name: "Endocrine Disruption", description: "May interfere with normal hormone function" },
      { name: "Potential Cancer Link", description: "Some studies suggest a possible link to certain cancers" },
      { name: "Reproductive Concerns", description: "May affect reproductive system development" }
    ],
    category: "Preservative"
  },
  {
    name: "formaldehyde",
    alternativeNames: [
      "formalin", 
      "methanal", 
      "quaternium-15", 
      "DMDM hydantoin", 
      "imidazolidinyl urea", 
      "diazolidinyl urea"
    ],
    riskLevel: RiskLevel.HIGH,
    description: "A known human carcinogen used as a preservative in many products.",
    healthConcerns: [
      { name: "Carcinogen", description: "Classified as a known human carcinogen" },
      { name: "Respiratory Issues", description: "Can irritate the respiratory system and trigger asthma" },
      { name: "Skin Irritation", description: "May cause contact dermatitis and skin sensitivity" }
    ],
    category: "Preservative"
  },
  {
    name: "phthalates",
    alternativeNames: ["DBP", "DEHP", "DEP", "dibutyl phthalate", "diethyl phthalate"],
    riskLevel: RiskLevel.HIGH,
    description: "Plasticizers that are endocrine disruptors and may affect reproductive development.",
    healthConcerns: [
      { name: "Endocrine Disruption", description: "Interferes with hormone production and function" },
      { name: "Reproductive Toxicity", description: "May cause reproductive and developmental issues" },
      { name: "Respiratory Issues", description: "Associated with increased risk of asthma and allergies" }
    ],
    category: "Plasticizer"
  },
  {
    name: "triclosan",
    alternativeNames: ["5-chloro-2-(2,4-dichlorophenoxy)phenol"],
    riskLevel: RiskLevel.HIGH,
    description: "An antibacterial agent that may disrupt hormone function and contribute to antibiotic resistance.",
    healthConcerns: [
      { name: "Antibiotic Resistance", description: "May contribute to the development of antibiotic-resistant bacteria" },
      { name: "Endocrine Disruption", description: "Can interfere with thyroid hormone and other hormonal processes" },
      { name: "Environmental Concerns", description: "Toxic to aquatic organisms and persists in the environment" }
    ],
    category: "Antimicrobial"
  }
];

// Sample database of safe ingredients
export const safeIngredients: Ingredient[] = [
  {
    name: "water",
    alternativeNames: ["aqua", "eau"],
    riskLevel: RiskLevel.SAFE,
    description: "The most common base for most products.",
    healthConcerns: [],
    category: "Base/Solvent"
  },
  {
    name: "glycerin",
    alternativeNames: ["glycerol", "glycerine"],
    riskLevel: RiskLevel.SAFE,
    description: "A humectant that attracts and retains moisture.",
    healthConcerns: [],
    category: "Humectant"
  },
  {
    name: "aloe vera",
    alternativeNames: ["aloe barbadensis leaf juice", "aloe barbadensis"],
    riskLevel: RiskLevel.SAFE,
    description: "Plant extract with soothing properties.",
    healthConcerns: [],
    category: "Plant Extract"
  },
  {
    name: "sodium chloride",
    alternativeNames: ["salt", "sea salt"],
    riskLevel: RiskLevel.SAFE,
    description: "Thickening agent and preservative.",
    healthConcerns: [],
    category: "Thickening Agent"
  },
  {
    name: "citric acid",
    alternativeNames: [],
    riskLevel: RiskLevel.SAFE,
    description: "pH adjuster derived from citrus fruits.",
    healthConcerns: [],
    category: "pH Adjuster"
  }
];

// Combined database for easier searching
export const ingredientDatabase: Ingredient[] = [...harmfulIngredients, ...safeIngredients];

/**
 * Find an ingredient in the database by name
 * @param name The ingredient name to search for
 * @returns The ingredient if found, null otherwise
 */
export function findIngredient(name: string): Ingredient | null {
  const cleanName = name.toLowerCase().trim();
  
  // First try exact match
  let match = ingredientDatabase.find(
    ingredient => ingredient.name === cleanName || ingredient.alternativeNames.includes(cleanName)
  );
  
  if (match) return match;
  
  // Then try partial match
  match = ingredientDatabase.find(
    ingredient => 
      cleanName.includes(ingredient.name) || 
      ingredient.alternativeNames.some(alt => cleanName.includes(alt))
  );
  
  if (match) return match;
  
  // Then try if the ingredient includes our search term
  // This handles cases where the ingredient name is part of a longer name
  match = ingredientDatabase.find(
    ingredient => 
      ingredient.name.includes(cleanName) || 
      ingredient.alternativeNames.some(alt => alt.includes(cleanName))
  );
  
  return match || null;
}

/**
 * Analyze a list of ingredients
 * @param ingredients Array of ingredient names
 * @returns Analysis results for each ingredient
 */
export function analyzeIngredients(ingredients: string[]): AnalysisResult[] {
  return ingredients.map(ingredient => {
    const cleanedIngredient = ingredient.toLowerCase().trim();
    const match = findIngredient(cleanedIngredient);
    
    return {
      ingredient: ingredient,
      matchedIngredient: match,
      confidence: match ? 
        (match.name === cleanedIngredient ? 1 : 
         match.alternativeNames.includes(cleanedIngredient) ? 0.9 : 0.7) : 0
    };
  });
}

/**
 * Calculate overall safety score based on analysis results
 * @param results Analysis results
 * @returns Safety score (0-10)
 */
export function calculateSafetyScore(results: AnalysisResult[]): number {
  const riskScores = {
    [RiskLevel.HIGH]: 3,
    [RiskLevel.MODERATE]: 2,
    [RiskLevel.LOW]: 1,
    [RiskLevel.SAFE]: 0
  };
  
  let totalRiskScore = 0;
  let matchedIngredients = 0;
  
  results.forEach(result => {
    if (result.matchedIngredient) {
      totalRiskScore += riskScores[result.matchedIngredient.riskLevel];
      matchedIngredients++;
    }
  });
  
  // If no ingredients were matched, return a neutral score
  if (matchedIngredients === 0) return 5;
  
  // Calculate the maximum possible risk score
  const maxRiskScore = matchedIngredients * riskScores[RiskLevel.HIGH];
  
  // Calculate safety score (0-10, where 10 is safest)
  return 10 - (totalRiskScore / maxRiskScore) * 10;
}

/**
 * Get counts of ingredients by risk level
 * @param results Analysis results
 * @returns Object with counts for each risk level
 */
export function getIngredientCountsByRiskLevel(results: AnalysisResult[]): Record<RiskLevel, number> {
  const counts = {
    [RiskLevel.HIGH]: 0,
    [RiskLevel.MODERATE]: 0,
    [RiskLevel.LOW]: 0,
    [RiskLevel.SAFE]: 0
  };
  
  results.forEach(result => {
    if (result.matchedIngredient) {
      counts[result.matchedIngredient.riskLevel]++;
    }
  });
  
  return counts;
}
