import { useState, useEffect } from 'react';

export function useOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // Check if the user has completed onboarding before
    const hasCompletedOnboarding = localStorage.getItem('onboardingCompleted') === 'true';
    
    // Show onboarding only for first-time visitors
    setShowOnboarding(!hasCompletedOnboarding);
    setHasChecked(true);
  }, []);

  const completeOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('onboardingCompleted', 'true');
  };

  const resetOnboarding = () => {
    localStorage.removeItem('onboardingCompleted');
    setShowOnboarding(true);
  };

  return {
    showOnboarding,
    hasChecked,
    completeOnboarding,
    resetOnboarding
  };
}