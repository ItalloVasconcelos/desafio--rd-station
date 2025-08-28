// Preferences.js

import React, { useState } from 'react';
import Checkbox from '../../shared/Checkbox';

function Preferences({
  preferences,
  selectedPreferences = [],
  onPreferenceChange,
}) {
  const [currentPreferences, setCurrentPreferences] = useState(selectedPreferences);

  // Update local state when selectedPreferences prop changes (for reset functionality)
  React.useEffect(() => {
    setCurrentPreferences(selectedPreferences);
  }, [selectedPreferences]);

  const handlePreferenceChange = (preference) => {
    const updatedPreferences = currentPreferences.includes(preference)
      ? currentPreferences.filter((pref) => pref !== preference)
      : [...currentPreferences, preference];

    setCurrentPreferences(updatedPreferences);
    onPreferenceChange(updatedPreferences);
  };

  return (
    <div className="space-y-4 animate-scale-in">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-300">Preferências:</h3>
      <div className="space-y-3">
        {preferences.map((preference, index) => (
          <div 
            key={index} 
            className="flex items-start transform transition-all duration-200 hover:translate-x-1 animate-slide-up"
            style={{animationDelay: `${index * 0.05}s`}}
          >
            <Checkbox
              value={preference}
              checked={currentPreferences.includes(preference)}
              onChange={() => handlePreferenceChange(preference)}
              className="text-blue-500 mt-1"
            >
              <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
                {preference}
              </span>
            </Checkbox>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Preferences;
