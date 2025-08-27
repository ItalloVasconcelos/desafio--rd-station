import React, { useState } from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';
import ThemeToggle from './components/shared/ThemeToggle';

function App() {
  const [recommendations, setRecommendations] = useState([]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Theme Toggle */}
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white text-center transition-colors duration-300 animate-fade-in">
            Recomendador de Produtos RD Station
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto transition-colors duration-300 animate-slide-up">
            Bem-vindo ao Recomendador de Produtos RD Station. Use o formulário abaixo para selecionar suas preferências e funcionalidades desejadas e receba recomendações personalizadas.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 animate-fade-in">
          {/* Form Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6 sm:p-8 h-fit transition-all duration-300 animate-slide-up">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 transition-colors duration-300">
              Configure suas Preferências
            </h2>
            <Form onUpdateRecommendations={setRecommendations} />
          </div>

          {/* Results Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6 sm:p-8 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.1s'}}>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 transition-colors duration-300">
              Recomendações
            </h2>
            <RecommendationList recommendations={recommendations} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
