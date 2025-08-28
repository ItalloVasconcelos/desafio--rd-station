import { renderHook, act, waitFor } from '@testing-library/react';
import useForm from './useForm';

describe('useForm Hook', () => {
  const initialState = {
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: 'MultipleProducts',
  };

  test('should initialize with initial state', () => {
    const { result } = renderHook(() => useForm(initialState));
    
    expect(result.current.formData).toEqual(initialState);
    expect(result.current.hasSelections()).toBe(false);
  });

  test('should update form data when handleChange is called', () => {
    const { result } = renderHook(() => useForm(initialState));
    
    act(() => {
      result.current.handleChange('selectedPreferences', ['Automação de marketing']);
    });

    expect(result.current.formData.selectedPreferences).toEqual(['Automação de marketing']);
    expect(result.current.hasSelections()).toBe(true);
  });

  test('should reset form data when resetForm is called', () => {
    const { result } = renderHook(() => useForm(initialState));
    
    // First, make some changes
    act(() => {
      result.current.handleChange('selectedPreferences', ['Automação de marketing']);
      result.current.handleChange('selectedFeatures', ['Gestão de leads']);
    });

    expect(result.current.hasSelections()).toBe(true);

    // Then reset
    act(() => {
      result.current.resetForm();
    });

    expect(result.current.formData).toEqual(initialState);
    expect(result.current.hasSelections()).toBe(false);
  });

  test('should correctly detect selections with hasSelections', async () => {
    const { result } = renderHook(() => useForm(initialState));
    
    // No selections initially
    expect(result.current.hasSelections()).toBe(false);

    // Add preference
    act(() => {
      result.current.handleChange('selectedPreferences', ['test']);
    });
    expect(result.current.hasSelections()).toBe(true);

    // Clear preferences, add features
    act(() => {
      result.current.handleChange('selectedPreferences', []);
      result.current.handleChange('selectedFeatures', ['test feature']);
    });
    expect(result.current.hasSelections()).toBe(true);

    // Clear everything
    act(() => {
      result.current.handleChange('selectedPreferences', []);
      result.current.handleChange('selectedFeatures', []);
    });
    
    expect(result.current.hasSelections()).toBe(false);
  });

  test('should handle multiple field updates correctly', () => {
    const { result } = renderHook(() => useForm(initialState));
    
    // Update preferences
    act(() => {
      result.current.handleChange('selectedPreferences', ['pref1', 'pref2']);
    });

    // Update features
    act(() => {
      result.current.handleChange('selectedFeatures', ['feat1']);
    });

    // Update recommendation type
    act(() => {
      result.current.handleChange('selectedRecommendationType', 'SingleProduct');
    });

    expect(result.current.formData).toEqual({
      selectedPreferences: ['pref1', 'pref2'],
      selectedFeatures: ['feat1'],
      selectedRecommendationType: 'SingleProduct',
    });

    expect(result.current.hasSelections()).toBe(true);
  });
});
