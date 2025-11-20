/**
 * SEO-Friendly Inventory Card Snippets for Harley-Davidson Models
 * Short 1-2 sentence descriptions (25-45 words) for inventory cards
 * Tone: descriptive, confident, keyword-friendly
 */

export interface InventorySnippet {
  model: string;
  snippet: string;
  wordCount: number;
}

export const inventorySnippets: { [key: string]: string } = {
  'Street Glide': 'Used Street Glide Milwaukee features the iconic batwing fairing and powerful Milwaukee-Eight engine. Perfect for touring with premium audio, comfortable ergonomics, and exceptional highway stability. Low miles, full warranty, financing available.',
  
  'Road Glide': 'Used Road Glide Milwaukee offers the distinctive sharknose fairing and superior wind protection. The frame-mounted fairing provides unmatched stability for long-distance touring. Highway-ready with premium features and proven reliability.',
  
  'Road King': 'Used Road King Milwaukee combines classic touring styling with modern Milwaukee-Eight power. Removable windshield, spacious storage, and legendary reliability make it ideal for Milwaukee riders. Inspected, documented, and ready to ride.',
  
  'Softail Slim': 'Used Softail Slim Milwaukee delivers classic bobber styling with modern performance. The Milwaukee-Eight engine and hidden suspension create authentic hardtail looks with smooth ride quality. Low mileage, well-maintained, and priced fairly.',
  
  'Sportster 883': 'Used Sportster 883 Milwaukee is Harley\'s most accessible entry point with nimble handling and classic V-twin power. Perfect for city riding and weekend adventures. Affordable, reliable, and ideal for first-time Harley owners.',
  
  'Sportster 1200': 'Used Sportster 1200 Milwaukee offers more power and performance than the 883 while maintaining nimble handling. Classic Sportster styling with enhanced torque for experienced riders. Well-maintained, documented, and ready for Milwaukee streets.',
  
  'Dyna': 'Used Dyna Milwaukee delivers raw power and responsive handling with authentic Harley-Davidson character. The Twin Cam engine and classic styling create an engaging riding experience. Proven reliable, well-documented, and priced competitively.',
  
  'Fat Bob': 'Used Fat Bob Milwaukee features aggressive styling with dual headlights and wide front tire. The powerful Milwaukee-Eight engine delivers serious performance for riders who want to stand out. Inspected, documented, and ready to ride.',
  
  'Breakout': 'Used Breakout Milwaukee combines muscular styling with powerful Milwaukee-Eight performance. The wide rear tire and aggressive stance create a distinctive look that turns heads. Low miles, well-maintained, and priced fairly for Milwaukee riders.',
  
  'Ultra Limited': 'Used Ultra Limited Milwaukee represents the pinnacle of Harley touring luxury with comprehensive amenities. Premium audio, advanced infotainment, and spacious storage make it ideal for serious long-distance touring. Highway-ready and meticulously maintained.'
};

/**
 * Get snippet for a specific model
 */
export function getInventorySnippet(modelName: string): string {
  // Try exact match first
  if (inventorySnippets[modelName]) {
    return inventorySnippets[modelName];
  }
  
  // Try case-insensitive match
  const lowerModel = modelName.toLowerCase();
  for (const [key, value] of Object.entries(inventorySnippets)) {
    if (key.toLowerCase() === lowerModel) {
      return value;
    }
  }
  
  // Try partial match for variants (e.g., "Street Glide Special" -> "Street Glide")
  for (const [key, value] of Object.entries(inventorySnippets)) {
    if (lowerModel.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerModel)) {
      return value;
    }
  }
  
  // Default fallback
  return `Used ${modelName} Milwaukee available at Joe's Used Harleys. Highway-ready, inspected, and priced fairly. Low miles, full warranty, financing available.`;
}

/**
 * Get all snippets with word counts
 */
export function getAllInventorySnippets(): InventorySnippet[] {
  return Object.entries(inventorySnippets).map(([model, snippet]) => ({
    model,
    snippet,
    wordCount: snippet.split(/\s+/).length
  }));
}

/**
 * Validate snippet word count (should be 25-45 words)
 */
export function validateSnippetLength(snippet: string): { valid: boolean; wordCount: number } {
  const wordCount = snippet.split(/\s+/).length;
  return {
    valid: wordCount >= 25 && wordCount <= 45,
    wordCount
  };
}

