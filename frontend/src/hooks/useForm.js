// useForm.js
import { useState } from 'react';

const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  /**
   * Updates a specific field in the form data
   * @param {string} field - The field name to update
   * @param {any} value - The new value for the field
   */
  const handleChange = (field, value) => {
    setFormData(prevFormData => ({ ...prevFormData, [field]: value }));
  };

  /**
   * Resets all form data to initial state
   */
  const resetForm = () => {
    setFormData(initialState);
  };

  /**
   * Checks if the form has any selections
   * @returns {boolean} Whether the form has any data different from initial state
   */
  const hasSelections = () => {
    return (
      formData.selectedPreferences?.length > 0 ||
      formData.selectedFeatures?.length > 0
    );
  };

  return { 
    formData, 
    handleChange, 
    resetForm, 
    hasSelections 
  };
};

export default useForm;
