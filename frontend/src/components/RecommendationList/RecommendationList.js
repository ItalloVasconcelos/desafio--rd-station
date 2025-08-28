import React from 'react';

function RecommendationList({ recommendations }) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Lista de Recomendações:</h2>

      {recommendations.length === 0 && (
        <div className="text-gray-500 dark:text-gray-400 text-center py-8 animate-bounce-gentle transition-colors duration-300">
          <p>Nenhuma recomendação encontrada.</p>
          <p className="text-sm mt-2">Selecione suas preferências para obter recomendações personalizadas.</p>
        </div>
      )}

      <div className="space-y-6">
        {recommendations.map((recommendation, index) => (
          <div 
            key={recommendation.id || index} 
            className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 animate-slide-up"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
              <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-2 sm:mb-0 transition-colors duration-300">{recommendation.name}</h3>
              {recommendation.score && (
                <span className="bg-blue-500 dark:bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full animate-bounce-gentle transition-colors duration-300">
                  Score: {recommendation.score}
                </span>
              )}
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4 font-medium transition-colors duration-300">
              <span className="text-gray-800 dark:text-gray-200">Categoria:</span> {recommendation.category}
            </p>
            
            {recommendation.preferences && recommendation.preferences.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 transition-colors duration-300">Preferências:</h4>
                <div className="flex flex-wrap gap-2">
                  {recommendation.preferences.map((pref, prefIndex) => (
                    <span 
                      key={prefIndex} 
                      className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs sm:text-sm px-3 py-1 rounded-full border border-green-200 dark:border-green-700 transition-all duration-200 hover:scale-110 animate-scale-in"
                      style={{animationDelay: `${prefIndex * 0.05}s`}}
                    >
                      {pref}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {recommendation.features && recommendation.features.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 transition-colors duration-300">Funcionalidades:</h4>
                <div className="flex flex-wrap gap-2">
                  {recommendation.features.map((feature, featureIndex) => (
                    <span 
                      key={featureIndex} 
                      className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 text-xs sm:text-sm px-3 py-1 rounded-full border border-purple-200 dark:border-purple-700 transition-all duration-200 hover:scale-110 animate-scale-in"
                      style={{animationDelay: `${featureIndex * 0.05}s`}}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendationList;
