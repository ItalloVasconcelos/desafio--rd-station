import React, { useState } from 'react';
import Checkbox from '../../shared/Checkbox';

function Features({ features, selectedFeatures = [], onFeatureChange }) {
  const [currentFeatures, setCurrentFeatures] = useState(selectedFeatures);

  // Update local state when selectedFeatures prop changes (for reset functionality)
  React.useEffect(() => {
    setCurrentFeatures(selectedFeatures);
  }, [selectedFeatures]);

  const handleFeatureChange = (feature) => {
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((pref) => pref !== feature)
      : [...currentFeatures, feature];

    setCurrentFeatures(updatedFeatures);
    onFeatureChange(updatedFeatures);
  };

  return (
    <div className="space-y-4 animate-scale-in">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-300">Funcionalidades:</h3>
      <div className="space-y-3">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="flex items-start transform transition-all duration-200 hover:translate-x-1 animate-slide-up"
            style={{animationDelay: `${index * 0.05}s`}}
          >
            <Checkbox
              value={feature}
              checked={currentFeatures.includes(feature)}
              onChange={() => handleFeatureChange(feature)}
              className="text-green-500 mt-1"
            >
              <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300 hover:text-green-600 dark:hover:text-green-400">
                {feature}
              </span>
            </Checkbox>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
