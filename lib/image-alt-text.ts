/**
 * High-Quality Alt Text for Used Harley Dealership Images
 * 50 descriptive, keyword-relevant alt texts (8-16 words each)
 * Focus: Harleys, Milwaukee riding, dealership scenes, chrome, V-twins
 */

export const imageAltTexts: string[] = [
  // Harley Models
  "Used Street Glide motorcycle for sale in Milwaukee with iconic batwing fairing and Milwaukee-Eight engine",
  "Used Road Glide motorcycle in Milwaukee featuring distinctive sharknose fairing and touring comfort",
  "Used Fat Bob Harley-Davidson motorcycle in Milwaukee with dual headlights and wide front tire",
  "Used Sportster 883 motorcycle for sale in Milwaukee perfect for city riding and first-time Harley owners",
  "Used Heritage Classic motorcycle in Milwaukee with classic cruiser styling and modern Milwaukee-Eight power",
  "Used Low Rider S motorcycle for sale in Milwaukee featuring aggressive styling and powerful performance",
  "Used Softail motorcycle in Milwaukee with hidden suspension and authentic hardtail appearance",
  "Used Road King motorcycle for sale in Milwaukee with removable windshield and spacious touring storage",
  "Used Breakout motorcycle in Milwaukee featuring muscular styling and wide rear tire design",
  "Used Ultra Limited motorcycle for sale in Milwaukee with premium touring amenities and advanced infotainment",
  
  // Milwaukee-Specific
  "Used Harley-Davidson motorcycle dealership in Milwaukee Wisconsin showing inventory of pre-owned bikes",
  "Milwaukee Harley dealer Joe's Used Harleys located at House Of Harley on W Layton Ave",
  "Used Harley motorcycles for sale in Milwaukee Wisconsin with Lake Michigan in background",
  "Milwaukee motorcycle dealership interior showing used Harley-Davidson bikes with chrome details and custom paint",
  "Used Harley inventory at Milwaukee dealership featuring Street Glides Road Glides and Softails",
  
  // Chrome and Details
  "Chrome exhaust pipes and V-twin engine on used Harley-Davidson motorcycle in Milwaukee",
  "Polished chrome handlebars and controls on used Harley motorcycle showing premium craftsmanship",
  "Chrome air cleaner and engine details on used Harley-Davidson motorcycle for sale in Milwaukee",
  "Custom chrome accessories and modifications on used Harley motorcycle at Milwaukee dealership",
  "Chrome wheels and brake calipers on used Harley-Davidson motorcycle with low mileage",
  
  // V-Twin Engines
  "Milwaukee-Eight V-twin engine on used Harley-Davidson motorcycle showing powerful performance and reliability",
  "Twin Cam V-twin engine detail on used Harley motorcycle with chrome covers and air intake",
  "V-twin engine with chrome covers on used Harley-Davidson motorcycle for sale in Milwaukee",
  "Used Harley motorcycle engine bay showing V-twin configuration and premium engine components",
  "Milwaukee-Eight 107 cubic inch engine on used Street Glide motorcycle in Milwaukee",
  
  // Dealership Scenes
  "Joe's Used Harleys dealership showroom in Milwaukee displaying used Harley-Davidson motorcycles for sale",
  "Used Harley motorcycle inventory at Milwaukee dealership with bikes arranged for customer viewing",
  "Milwaukee motorcycle dealer service area with used Harley-Davidson bikes undergoing inspection and maintenance",
  "Customer inspecting used Harley motorcycle at Joe's Used Harleys dealership in Milwaukee Wisconsin",
  "Used Harley motorcycle sales floor at Milwaukee dealership with multiple models available",
  
  // Riding Scenes
  "Rider on used Harley-Davidson motorcycle cruising along Milwaukee Lake Michigan shoreline",
  "Used Harley motorcycle on Wisconsin country road showing touring comfort and highway performance",
  "Group of riders on used Harley-Davidson motorcycles in Milwaukee motorcycle community event",
  "Used Harley motorcycle parked at Milwaukee landmark with Lake Michigan in background",
  "Rider on used Street Glide motorcycle touring through Wisconsin scenic countryside",
  
  // Service and Maintenance
  "Used Harley motorcycle service bay at Milwaukee dealership with technician performing inspection",
  "Service records and documentation for used Harley-Davidson motorcycle at Joe's Used Harleys Milwaukee",
  "Used Harley motorcycle undergoing comprehensive inspection at Milwaukee dealership before sale",
  "Carfax report and service history documentation for used Harley motorcycle in Milwaukee",
  "Used Harley motorcycle maintenance and inspection process at Milwaukee motorcycle dealership",
  
  // Inventory and Selection
  "Wide selection of used Harley-Davidson motorcycles available at Milwaukee dealership Joe's Used Harleys",
  "Used Harley motorcycle inventory display at Milwaukee dealership showing various models and years",
  "Multiple used Harley-Davidson motorcycles for sale at Milwaukee dealership with transparent pricing",
  "Used Harley motorcycle showroom at Milwaukee dealership featuring low-mileage bikes with full warranty",
  "Inventory of used Harley motorcycles at Joe's Used Harleys Milwaukee with financing available",
  
  // Custom and Modifications
  "Custom paint job and modifications on used Harley-Davidson motorcycle for sale in Milwaukee",
  "Used Harley motorcycle with Stage 1 performance upgrades and custom exhaust system in Milwaukee",
  "Custom handlebars and aftermarket accessories on used Harley-Davidson motorcycle at Milwaukee dealership",
  "Used Harley motorcycle with premium audio system and touring accessories in Milwaukee",
  "Customized used Harley-Davidson motorcycle with chrome accessories and performance modifications",
  
  // Trust and Quality
  "Used Harley motorcycle with complete service records and Carfax report at Milwaukee dealership",
  "Certified used Harley-Davidson motorcycle at Joe's Used Harleys Milwaukee with 48-hour guarantee",
  "Low-mileage used Harley motorcycle in excellent condition for sale in Milwaukee Wisconsin",
  "Well-maintained used Harley-Davidson motorcycle with full warranty coverage at Milwaukee dealership",
  "Inspected and certified used Harley motorcycle ready for sale at Milwaukee motorcycle dealer"
];

/**
 * Get all alt texts
 */
export function getAllAltTexts(): string[] {
  return imageAltTexts;
}

/**
 * Get random alt text
 */
export function getRandomAltText(): string {
  const randomIndex = Math.floor(Math.random() * imageAltTexts.length);
  return imageAltTexts[randomIndex];
}

/**
 * Get alt text by category
 */
export function getAltTextByCategory(
  category: 'model' | 'milwaukee' | 'chrome' | 'engine' | 'dealership' | 'riding' | 'service' | 'inventory' | 'custom' | 'trust'
): string[] {
  const categoryMap: { [key: string]: number[] } = {
    model: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    milwaukee: [10, 11, 12, 13, 14],
    chrome: [15, 16, 17, 18, 19],
    engine: [20, 21, 22, 23, 24],
    dealership: [25, 26, 27, 28, 29],
    riding: [30, 31, 32, 33, 34],
    service: [35, 36, 37, 38, 39],
    inventory: [40, 41, 42, 43, 44],
    custom: [45, 46, 47, 48, 49],
    trust: [50, 51, 52, 53, 54]
  };
  
  const indices = categoryMap[category] || [];
  return indices.map(index => imageAltTexts[index]).filter(Boolean);
}

/**
 * Validate alt text word count (should be 8-16 words)
 */
export function validateAltText(altText: string): { valid: boolean; wordCount: number } {
  const wordCount = altText.split(/\s+/).length;
  return {
    valid: wordCount >= 8 && wordCount <= 16,
    wordCount
  };
}

