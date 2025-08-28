import React from 'react';
import Checkbox from '../../shared/Checkbox';

function RecommendationType({ selectedType, onRecommendationTypeChange }) {
  return (
    <div className="space-y-4 animate-scale-in">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-300">Tipo de Recomendação:</h3>
      <div className="space-y-3">
        <div className="flex items-center transform transition-all duration-200 hover:translate-x-1 animate-slide-up">
          <Checkbox
            type="radio"
            name="recommendationType"
            value="SingleProduct"
            checked={selectedType === 'SingleProduct'}
            onChange={() => onRecommendationTypeChange('SingleProduct')}
            className="mr-3"
          />
          <label 
            className="text-sm sm:text-base text-gray-700 dark:text-gray-300 cursor-pointer transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400" 
            onClick={() => onRecommendationTypeChange('SingleProduct')}
          >
            Produto Único
          </label>
        </div>
        <div className="flex items-center transform transition-all duration-200 hover:translate-x-1 animate-slide-up" style={{animationDelay: '0.05s'}}>
          <Checkbox
            type="radio"
            name="recommendationType"
            value="MultipleProducts"
            checked={selectedType === 'MultipleProducts'}
            onChange={() => onRecommendationTypeChange('MultipleProducts')}
            className="mr-3"
          />
          <label 
            className="text-sm sm:text-base text-gray-700 dark:text-gray-300 cursor-pointer transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400" 
            onClick={() => onRecommendationTypeChange('MultipleProducts')}
          >
            Múltiplos Produtos
          </label>
        </div>
      </div>
    </div>
  );
}

export default RecommendationType;
