/**
 * Validates the recommendation request parameters
 * @param {Object} formData - User form data
 * @param {Array} products - Available products
 * @returns {Object} Validation result with success and message
 */
const validateRecommendationRequest = (formData, products) => {
  if (!products?.length) {
    return { isValid: false, message: 'No products available' };
  }

  if (!formData) {
    return { isValid: false, message: 'Form data is required' };
  }

  const { selectedPreferences = [], selectedFeatures = [] } = formData;
  
  if (selectedPreferences.length === 0 && selectedFeatures.length === 0) {
    return { isValid: false, message: 'At least one preference or feature must be selected' };
  }

  return { isValid: true };
};

/**
 * Calculates the score for a single product based on user selections
 * @param {Object} product - Product to score
 * @param {Set} selectedItemsSet - Set of selected preferences and features for O(1) lookup
 * @returns {number} Product score
 */
const calculateProductScore = (product, selectedItemsSet) => {
  const productItems = [...product.preferences, ...product.features];
  return productItems.filter(item => selectedItemsSet.has(item)).length;
};

/**
 * Applies scoring to all products
 * @param {Array} products - List of products
 * @param {Array} selectedPreferences - User selected preferences
 * @param {Array} selectedFeatures - User selected features
 * @returns {Array} Products with scores
 */
const scoreAllProducts = (products, selectedPreferences, selectedFeatures) => {
  // Create Set for O(1) lookup instead of O(n) includes()
  const selectedItemsSet = new Set([...selectedPreferences, ...selectedFeatures]);
  
  return products.map(product => ({
    ...product,
    score: calculateProductScore(product, selectedItemsSet)
  }));
};

/**
 * Filters products that have at least the minimum score
 * @param {Array} scoredProducts - Products with scores
 * @param {number} minScore - Minimum score threshold (default: 1)
 * @returns {Array} Filtered products
 */
const filterProductsByMinScore = (scoredProducts, minScore = 1) => {
  return scoredProducts.filter(product => product.score >= minScore);
};

/**
 * Selects a single product based on highest score (last one in case of tie)
 * @param {Array} filteredProducts - Products filtered by score
 * @returns {Array} Array with single product or empty array
 */
const selectSingleProduct = (filteredProducts) => {
  if (filteredProducts.length === 0) return [];
  
  const maxScore = Math.max(...filteredProducts.map(p => p.score));
  const topProducts = filteredProducts.filter(p => p.score === maxScore);
  
  // Return the last product in case of tie (as per requirement)
  return [topProducts[topProducts.length - 1]];
};

/**
 * Selects and sorts multiple products by score (descending)
 * @param {Array} filteredProducts - Products filtered by score
 * @returns {Array} Sorted products
 */
const selectMultipleProducts = (filteredProducts) => {
  return filteredProducts.sort((a, b) => b.score - a.score);
};

/**
 * Main recommendation function that orchestrates the recommendation process
 * @param {Object} formData - User form data with preferences, features, and recommendation type
 * @param {Array} products - Available products list
 * @returns {Array} Recommended products based on user selections
 */
const getRecommendations = (
  formData = {
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: 'MultipleProducts',
  },
  products
) => {
  // Validate request
  const validation = validateRecommendationRequest(formData, products);
  if (!validation.isValid) {
    console.warn(`Recommendation validation failed: ${validation.message}`);
    return [];
  }

  const {
    selectedPreferences = [],
    selectedFeatures = [],
    selectedRecommendationType = 'MultipleProducts',
  } = formData;

  // Score all products
  const scoredProducts = scoreAllProducts(products, selectedPreferences, selectedFeatures);
  
  // Filter products with score > 0
  const filteredProducts = filterProductsByMinScore(scoredProducts);
  
  // Return appropriate result based on recommendation type
  if (selectedRecommendationType === 'SingleProduct') {
    return selectSingleProduct(filteredProducts);
  }
  
  return selectMultipleProducts(filteredProducts);
};

export default  getRecommendations ;
