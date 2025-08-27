// useRecommendations.js

import { useState } from 'react';
import getRecommendations from '../services/recommendation.service';

function useRecommendations(products) {
  const [recommendations, setRecommendations] = useState([]);

  const getRecommendationsFromService = (formData) => {
    return getRecommendations(formData, products);
  };

  return { recommendations, getRecommendations: getRecommendationsFromService, setRecommendations };
}

export default useRecommendations;
