import React, { useState } from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { ResetButton } from './ResetButton';
import LoadingSpinner from '../shared/LoadingSpinner';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';

function Form({ onUpdateRecommendations }) {
  const { preferences, features, products, loading, error: productsError } = useProducts();
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { formData, handleChange, resetForm, hasSelections } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: 'MultipleProducts', // Default value
  });

  const { getRecommendations } = useRecommendations(products);

  /**
   * Validates form data before submission
   * @returns {Object} Validation result with success and message
   */
  const validateForm = () => {
    if (formData.selectedPreferences.length === 0 && formData.selectedFeatures.length === 0) {
      return { 
        isValid: false, 
        message: 'Por favor, selecione pelo menos uma preferência ou funcionalidade.' 
      };
    }

    if (!formData.selectedRecommendationType) {
      return { 
        isValid: false, 
        message: 'Por favor, selecione o tipo de recomendação.' 
      };
    }

    return { isValid: true };
  };

  /**
   * Checks if the form can be submitted
   * @returns {boolean} Whether the form is submittable
   */
  const canSubmit = () => {
    return (
      !loading &&
      !productsError &&
      (formData.selectedPreferences.length > 0 || formData.selectedFeatures.length > 0) &&
      formData.selectedRecommendationType &&
      !isSubmitting
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validate form
    const validation = validateForm();
    if (!validation.isValid) {
      setFormError(validation.message);
      return;
    }

    setIsSubmitting(true);

    try {
      const recommendations = getRecommendations(formData);
      onUpdateRecommendations(recommendations);
    } catch (err) {
      setFormError('Erro ao obter recomendações. Tente novamente.');
      console.error('Error getting recommendations:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handles form reset - clears all selections and recommendations
   */
  const handleReset = () => {
    resetForm();
    setFormError('');
    onUpdateRecommendations([]); // Clear recommendations as well
  };

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      <Preferences
        preferences={preferences}
        selectedPreferences={formData.selectedPreferences}
        onPreferenceChange={(selected) => {
          handleChange('selectedPreferences', selected);
          setFormError(''); // Clear error when user makes changes
        }}
      />
      <Features
        features={features}
        selectedFeatures={formData.selectedFeatures}
        onFeatureChange={(selected) => {
          handleChange('selectedFeatures', selected);
          setFormError(''); // Clear error when user makes changes
        }}
      />
      <RecommendationType
        selectedType={formData.selectedRecommendationType}
        onRecommendationTypeChange={(selected) => {
          handleChange('selectedRecommendationType', selected);
          setFormError(''); // Clear error when user makes changes
        }}
      />
      
      {/* Loading state */}
      {loading && (
        <LoadingSpinner 
          message="Carregando produtos..."
          size="md"
        />
      )}

      {/* Error message display for products */}
      {productsError && (
        <div className="p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg transition-colors duration-300 animate-scale-in">
          <p className="font-medium">Erro ao carregar produtos</p>
          <p className="text-sm mt-1">{productsError}</p>
        </div>
      )}

      {/* Error message display for form validation */}
      {formError && (
        <div className="p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg transition-colors duration-300 animate-scale-in">
          {formError}
        </div>
      )}

      <div className="pt-6 space-y-4">
        <button
          type="submit"
          disabled={!canSubmit()}
          className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 animate-scale-in ${
            canSubmit()
              ? 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-sm hover:shadow-md transform hover:-translate-y-0.5 hover:scale-105'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Obtendo recomendações...
            </div>
          ) : (
            'Obter Recomendação'
          )}
        </button>
        
        <ResetButton
          onReset={handleReset}
          disabled={!hasSelections() || isSubmitting || loading}
        />
      </div>
    </form>
  );
}
export default Form;
