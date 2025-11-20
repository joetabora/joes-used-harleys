/**
 * Generate comprehensive keyword variations for Harley-Davidson models
 * Outputs 50-150 keyword variations for SEO optimization
 */

export function generateHarleyKeywords(modelName: string): string[] {
  const model = modelName.toLowerCase().trim();
  const modelCapitalized = modelName.trim();
  const modelNoSpaces = model.replace(/\s+/g, '');
  const modelHyphenated = model.replace(/\s+/g, '-');
  
  const keywords: string[] = [];
  
  // Base location variations
  const locations = ['milwaukee', 'wisconsin', 'wi', 'waukesha', 'racine'];
  
  // Base model variations
  const modelVariations = [
    model,
    modelCapitalized,
    `harley ${model}`,
    `harley davidson ${model}`,
    `harley-davidson ${model}`,
    `hd ${model}`,
    `${model} harley`,
    `${model} harley davidson`
  ];
  
  // Price/condition variations
  const priceTerms = ['cheap', 'affordable', 'low price', 'best price', 'discount', 'budget'];
  const conditionTerms = ['used', 'pre-owned', 'second hand', 'preowned'];
  const qualityTerms = ['low mileage', 'excellent condition', 'mint condition', 'well maintained', 'high quality'];
  
  // Action/transaction terms
  const actionTerms = ['for sale', 'buy', 'purchase', 'find', 'shop', 'dealer', 'dealership'];
  const financingTerms = ['financing', 'financing available', 'easy financing', 'bad credit financing'];
  
  // Generate comprehensive keyword combinations
  locations.forEach(location => {
    // Model + Location combinations
    modelVariations.forEach(modelVar => {
      keywords.push(`used ${modelVar} ${location}`);
      keywords.push(`${modelVar} for sale ${location}`);
      keywords.push(`harley ${modelVar} ${location}`);
      keywords.push(`harley davidson ${modelVar} ${location}`);
      keywords.push(`${location} ${modelVar} harley`);
      keywords.push(`${location} ${modelVar} for sale`);
      keywords.push(`buy ${modelVar} ${location}`);
      keywords.push(`${modelVar} dealer ${location}`);
      keywords.push(`${modelVar} dealership ${location}`);
    });
    
    // Price + Model + Location
    priceTerms.forEach(price => {
      keywords.push(`${price} ${model} ${location}`);
      keywords.push(`${price} harley ${model} ${location}`);
      keywords.push(`${price} used ${model} ${location}`);
    });
    
    // Condition + Model + Location
    conditionTerms.forEach(condition => {
      keywords.push(`${condition} ${model} ${location}`);
      keywords.push(`${condition} harley ${model} ${location}`);
    });
    
    // Quality + Model + Location
    qualityTerms.forEach(quality => {
      keywords.push(`${quality} ${model} ${location}`);
      keywords.push(`${quality} harley ${model} ${location}`);
    });
  });
  
  // Generic model keywords (no location)
  modelVariations.forEach(modelVar => {
    keywords.push(`used ${modelVar}`);
    keywords.push(`${modelVar} for sale`);
    keywords.push(`buy ${modelVar}`);
    keywords.push(`cheap ${modelVar}`);
    keywords.push(`affordable ${modelVar}`);
    keywords.push(`low mileage ${modelVar}`);
    keywords.push(`best price ${modelVar}`);
    keywords.push(`discount ${modelVar}`);
    keywords.push(`pre-owned ${modelVar}`);
    keywords.push(`harley dealer ${modelVar}`);
    keywords.push(`${modelVar} financing`);
    keywords.push(`${modelVar} harley davidson`);
  });
  
  // Price + Model combinations
  priceTerms.forEach(price => {
    keywords.push(`${price} ${model}`);
    keywords.push(`${price} harley ${model}`);
    keywords.push(`${price} used ${model}`);
  });
  
  // Condition + Model combinations
  conditionTerms.forEach(condition => {
    keywords.push(`${condition} ${model}`);
    keywords.push(`${condition} harley ${model}`);
  });
  
  // Quality + Model combinations
  qualityTerms.forEach(quality => {
    keywords.push(`${quality} ${model}`);
    keywords.push(`${quality} harley ${model}`);
    keywords.push(`${quality} used ${model}`);
  });
  
  // Financing keywords
  locations.forEach(location => {
    keywords.push(`used motorcycle financing ${location}`);
    keywords.push(`harley financing ${location}`);
    keywords.push(`motorcycle financing ${location}`);
    keywords.push(`harley davidson financing ${location}`);
    keywords.push(`bad credit harley financing ${location}`);
    keywords.push(`easy harley financing ${location}`);
  });
  
  // Dealer keywords
  locations.forEach(location => {
    keywords.push(`harley dealer ${location}`);
    keywords.push(`harley dealership ${location}`);
    keywords.push(`harley davidson dealer ${location}`);
    keywords.push(`used harley dealer ${location}`);
    keywords.push(`harley motorcycle dealer ${location}`);
    keywords.push(`${model} dealer ${location}`);
  });
  
  // Comparison and search terms
  keywords.push(`best ${model} price`);
  keywords.push(`compare ${model} prices`);
  keywords.push(`find ${model} near me`);
  keywords.push(`${model} inventory`);
  keywords.push(`${model} listings`);
  keywords.push(`where to buy ${model}`);
  keywords.push(`${model} reviews`);
  keywords.push(`best ${model} for sale`);
  
  // Year + Model combinations (common years)
  const recentYears = ['2024', '2023', '2022', '2021', '2020', '2019'];
  recentYears.forEach(year => {
    keywords.push(`${year} ${model}`);
    keywords.push(`used ${year} ${model}`);
    keywords.push(`${year} ${model} for sale`);
    keywords.push(`used ${year} ${model} milwaukee`);
  });
  
  // Remove duplicates and return
  return [...new Set(keywords)].filter(k => k.length > 0);
}

