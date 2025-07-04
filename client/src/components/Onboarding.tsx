import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";
import labStudentsImg from "@assets/ChatGPT Image May 16, 2025 at 06_00_02 PM.png";

interface OnboardingStep {
  title: string;
  description: string;
  image?: string;
  tip?: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    title: "Welcome to Inkwell Labs on the Go!",
    description: "Your digital science laboratory for Grades 7-12, aligned with South African curriculum standards.",
    image: labStudentsImg,
    tip: "You can access this tutorial again from your profile settings"
  },
  {
    title: "Browse Experiments by Grade",
    description: "Select your grade level to see curriculum-specific experiments designed for your learning stage.",
    tip: "The experiments become more advanced with each grade level"
  },
  {
    title: "Filter by Topic",
    description: "Find experiments in specific areas like Chemistry, Physics, or Biology that match your interests.",
    tip: "Try different topics to discover the full range of experiments"
  },
  {
    title: "Try AR Experiments",
    description: "Experience science in 3D with our augmented reality experiments that bring concepts to life.",
    tip: "Make sure your camera is enabled to enjoy the full AR experience"
  },
  {
    title: "Track Your Progress",
    description: "Complete experiments and quizzes to earn badges and track your learning journey.",
    tip: "Regular practice helps reinforce scientific concepts"
  },
  {
    title: "Challenge Yourself with Science Buddy",
    description: "Test your knowledge with our interactive Science Buddy game and earn achievement badges.",
    tip: "Science Buddy is available to all users, even without a subscription"
  }
];

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  // Auto-progress through steps (can be disabled in settings)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < onboardingSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }, 8000); // 8 seconds per step
    
    return () => clearTimeout(timer);
  }, [currentStep]);
  
  // Calculate progress percentage
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;
  
  // Close onboarding
  const handleComplete = () => {
    setIsVisible(false);
    // Save to localStorage that user has completed onboarding
    localStorage.setItem('onboardingCompleted', 'true');
    // Notify parent component
    onComplete();
  };
  
  // Go to next step
  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };
  
  // Go to previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Skip to the end
  const handleSkip = () => {
    handleComplete();
  };
  
  if (!isVisible) return null;
  
  const step = onboardingSteps[currentStep];
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl"
        >
          <Card className="border-2 border-primary shadow-lg">
            <div className="absolute top-2 right-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleSkip}
                className="h-8 w-8 rounded-full"
                aria-label="Close onboarding"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-center text-primary font-bold">
                {step.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-0">
              {step.image && (
                <div className="relative w-full h-40 md:h-64 mb-4 overflow-hidden rounded-md">
                  <div 
                    className="w-full h-full bg-center bg-cover"
                    style={{ 
                      backgroundImage: `url(${step.image})`,
                    }}
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-2">
                    <p className="text-sm">Inkwell Labs: Curriculum-aligned South African science education</p>
                  </div>
                </div>
              )}
              
              <p className="text-gray-700 mb-2 text-center md:text-lg">
                {step.description}
              </p>
              
              {step.tip && (
                <div className="bg-blue-50 text-blue-800 p-3 rounded-md text-sm mt-2">
                  <strong>Tip:</strong> {step.tip}
                </div>
              )}
              
              <div className="mt-4">
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Step {currentStep + 1} of {onboardingSteps.length}</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between pt-2">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              
              <Button 
                variant="default" 
                onClick={handleNext}
              >
                {currentStep < onboardingSteps.length - 1 ? 'Next' : 'Get Started'}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}