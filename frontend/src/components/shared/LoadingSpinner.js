import React from 'react';

/**
 * Loading spinner component with customizable size and message
 * @param {Object} props - Component props
 * @param {string} props.size - Size of spinner: 'sm', 'md', 'lg' (default: 'md')
 * @param {string} props.message - Loading message to display
 * @param {boolean} props.fullScreen - Whether to show as full screen overlay
 */
function LoadingSpinner({ 
  size = 'md', 
  message = 'Carregando...', 
  fullScreen = false 
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const containerClass = fullScreen 
    ? 'fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 flex flex-col items-center justify-center z-50 transition-colors duration-300'
    : 'flex flex-col items-center justify-center py-8 animate-bounce-gentle';

  return (
    <div className={containerClass}>
      <div className={`${sizeClasses[size]} animate-spin`}>
        <svg
          className="w-full h-full text-blue-500 dark:text-blue-400 transition-colors duration-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
      
      {message && (
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-center font-medium transition-colors duration-300 animate-fade-in">
          {message}
        </p>
      )}
    </div>
  );
}

export default LoadingSpinner;
