import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Scans history schema
export const scans = pgTable("scans", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  imageUrl: text("image_url"),
  extractedText: text("extracted_text"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertScanSchema = createInsertSchema(scans).pick({
  userId: true,
  imageUrl: true,
  extractedText: true,
});

// Ingredient schema
export const ingredients = pgTable("ingredients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  alternativeNames: text("alternative_names").array(),
  description: text("description"),
  riskLevel: text("risk_level").notNull(),
  category: text("category"),
});

export const insertIngredientSchema = createInsertSchema(ingredients).pick({
  name: true,
  alternativeNames: true,
  description: true,
  riskLevel: true,
  category: true,
});

// Health concern schema
export const healthConcerns = pgTable("health_concerns", {
  id: serial("id").primaryKey(),
  ingredientId: integer("ingredient_id").references(() => ingredients.id),
  name: text("name").notNull(),
  description: text("description"),
});

export const insertHealthConcernSchema = createInsertSchema(healthConcerns).pick({
  ingredientId: true,
  name: true,
  description: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertScan = z.infer<typeof insertScanSchema>;
export type Scan = typeof scans.$inferSelect;

export type InsertIngredient = z.infer<typeof insertIngredientSchema>;
export type Ingredient = typeof ingredients.$inferSelect;

export type InsertHealthConcern = z.infer<typeof insertHealthConcernSchema>;
export type HealthConcern = typeof healthConcerns.$inferSelect;
