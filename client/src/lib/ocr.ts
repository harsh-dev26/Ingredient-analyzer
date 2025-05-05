import Tesseract from 'tesseract.js';

export interface OCRResult {
  text: string;
  confidence: number;
}

/**
 * Performs OCR on an image to extract text
 * @param imageFile The image file to process
 * @returns A promise that resolves to the extracted text and confidence score
 */
export async function performOCR(imageFile: File | string): Promise<OCRResult> {
  try {
    // Log start of OCR process
    console.log('Starting OCR processing...');
    
    // Perform OCR using Tesseract.js
    const result = await Tesseract.recognize(
      imageFile,
      'eng', // English language
      {
        logger: m => {
          if (m.status === 'recognizing text') {
            console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
          }
        }
      }
    );
    
    // Return the extracted text and confidence score
    return {
      text: result.data.text,
      confidence: result.data.confidence
    };
  } catch (error) {
    console.error('OCR processing error:', error);
    throw new Error('Failed to extract text from image');
  }
}

/**
 * Parse ingredient list from text
 * @param text Raw text extracted from OCR
 * @returns Array of ingredient names
 */
export function parseIngredients(text: string): string[] {
  // Common patterns to find ingredient lists
  const patterns = [
    /ingredients:(.+?)(\.|$)/i,
    /contains:(.+?)(\.|$)/i,
    /composed of:(.+?)(\.|$)/i
  ];

  // Try to find ingredient list using patterns
  let ingredientText = '';
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      ingredientText = match[1].trim();
      break;
    }
  }

  // If no pattern matched, use the entire text
  if (!ingredientText) {
    ingredientText = text.trim();
  }

  // Split ingredients by common delimiters
  return ingredientText
    .split(/,|\.|;|\n/)
    .map(item => item.trim())
    .filter(item => item.length > 0 && item.length < 50); // Filter out empty strings and very long strings
}

/**
 * Cleans up ingredient name for better matching
 * @param ingredient Raw ingredient name
 * @returns Cleaned ingredient name
 */
export function cleanIngredientName(ingredient: string): string {
  return ingredient
    .toLowerCase()
    .replace(/\([^)]*\)/g, '') // Remove content in parentheses
    .replace(/\*|†|‡/g, '') // Remove special characters
    .trim();
}
