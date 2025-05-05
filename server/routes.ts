import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { harmfulIngredients, RiskLevel } from "../client/src/lib/ingredientsDatabase";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for ingredient database
  app.get('/api/ingredients', (req, res) => {
    res.json({
      message: 'Ingredient database API endpoint',
      status: 'active'
    });
  });

  // API route for retrieving unsafe ingredients
  app.get('/api/ingredients/unsafe', (req, res) => {
    try {
      // Get risk level filter from query parameter if provided
      const riskLevel = req.query.riskLevel as string | undefined;
      
      let filteredIngredients = [...harmfulIngredients];
      
      // Filter by risk level if specified
      if (riskLevel && Object.values(RiskLevel).includes(riskLevel as RiskLevel)) {
        filteredIngredients = filteredIngredients.filter(
          ingredient => ingredient.riskLevel === riskLevel
        );
      }
      
      res.json({
        success: true,
        count: filteredIngredients.length,
        ingredients: filteredIngredients
      });
    } catch (error) {
      console.error('Error fetching unsafe ingredients:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve unsafe ingredients',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // API route for retrieving ingredient details by name
  app.get('/api/ingredients/:name', (req, res) => {
    try {
      const ingredientName = req.params.name.toLowerCase();
      
      // Find ingredient by name or alternative names
      const ingredient = harmfulIngredients.find(
        ing => ing.name === ingredientName || 
              ing.alternativeNames.some(alt => alt === ingredientName)
      );
      
      if (!ingredient) {
        return res.status(404).json({
          success: false,
          message: 'Ingredient not found'
        });
      }
      
      res.json({
        success: true,
        ingredient
      });
    } catch (error) {
      console.error('Error fetching ingredient details:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve ingredient details',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // API route for saving scan history (for future implementation)
  app.post('/api/history', (req, res) => {
    // This would be implemented in a real application to save scan history
    res.json({
      message: 'Scan history saved successfully',
      success: true
    });
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString()
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
