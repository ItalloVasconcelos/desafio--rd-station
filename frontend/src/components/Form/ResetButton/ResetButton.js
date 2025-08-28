import React from 'react';

/**
 * Reset button component for clearing form selections
 * @param {Object} props - Component props
 * @param {Function} props.onReset - Function to call when reset is clicked
 * @param {boolean} props.disabled - Whether the button should be disabled
 * @param {string} props.text - Button text (optional)
 */
function ResetButton({ onReset, disabled = false, text = "Limpar seleções" }) {
  return (
    <button
      type="button"
      onClick={onReset}
      disabled={disabled}
      className={`w-full font-semibold py-3 px-6 rounded-lg border-2 transition-all duration-200 animate-scale-in ${
        disabled
          ? 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
          : 'bg-white dark:bg-gray-800 border-red-500 dark:border-red-400 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 hover:border-red-600 dark:hover:border-red-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 hover:scale-105'
      }`}
      aria-label="Limpar todas as seleções do formulário"
    >
      {text}
    </button>
  );
}

export default ResetButton;
