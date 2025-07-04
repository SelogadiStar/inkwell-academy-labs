import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Info, Award, BookOpen, Beaker, Search, ArrowRight } from "lucide-react";

interface OnboardingTutorialProps {
  onComplete: () => void;
  resetOnboarding?: () => void;
}

// Tutorial steps with more interactive elements
const tutorialSteps = [
  {
    title: "Welcome to Inkwell Labs",
    description: "Your digital science laboratory from inkwellacademy.org for South African curriculum Grades 7-12",
    icon: <Info className="h-8 w-8 text-primary" />,
    animation: (
      <motion.div 
        className="flex justify-center mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: [0, 5, -5, 0] }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="bg-gradient-to-br from-primary to-primary/70 text-white p-6 rounded-full">
          <Beaker className="h-12 w-12" />
        </div>
      </motion.div>
    )
  },
  {
    title: "Browse Experiments by Grade",
    description: "Find the perfect experiments for your grade level with our curriculum-matched content",
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    animation: (
      <div className="flex justify-center gap-2 mb-6">
        {[7, 8, 9, 10, 11, 12].map((grade, index) => (
          <motion.div 
            key={grade}
            className={`flex items-center justify-center h-12 w-12 rounded-full border-2 ${index === 0 ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300'}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {grade}
          </motion.div>
        ))}
      </div>
    )
  },
  {
    title: "Interactive Experiments",
    description: "Conduct virtual experiments with step-by-step instructions and 3D visualizations",
    icon: <Beaker className="h-8 w-8 text-primary" />,
    animation: (
      <motion.div 
        className="flex flex-col items-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="w-48 h-36 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg p-3 mb-2 relative overflow-hidden"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-12 bg-blue-500 rounded-b-lg"
            initial={{ height: "0px" }}
            animate={{ height: "60px" }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.div 
            className="absolute top-3 right-3 w-8 h-12 bg-gray-300 rounded-t-lg"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
          />
        </motion.div>
        <motion.p 
          className="text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Water displacement experiment
        </motion.p>
      </motion.div>
    )
  },
  {
    title: "Track Your Progress",
    description: "Complete experiments and earn badges to track your scientific journey",
    icon: <Award className="h-8 w-8 text-primary" />,
    animation: (
      <div className="flex justify-center gap-3 mb-6">
        {['bronze', 'silver', 'gold'].map((level, index) => {
          const colors = {
            bronze: 'from-amber-700 to-amber-500',
            silver: 'from-gray-400 to-gray-300',
            gold: 'from-yellow-500 to-yellow-300'
          }[level];
          
          return (
            <motion.div 
              key={level}
              className={`flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br ${colors} text-white`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.3,
                y: { delay: index * 0.3 + 0.5, duration: 0.5 }
              }}
            >
              <Award className="h-8 w-8" />
            </motion.div>
          );
        })}
      </div>
    )
  },
  {
    title: "Inkwell Science Buddy",
    description: "Test your knowledge with Inkwell Science Buddy quizzes and learn from 60+ curriculum-aligned science facts",
    icon: <Search className="h-8 w-8 text-primary" />,
    animation: (
      <motion.div 
        className="bg-blue-100 rounded-lg p-4 mb-6 max-w-xs mx-auto"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="flex items-center gap-3 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-primary rounded-full p-2">
            <Beaker className="h-5 w-5 text-white" />
          </div>
          <p className="font-medium text-primary">Science Buddy</p>
        </motion.div>
        <motion.p 
          className="text-sm bg-white p-3 rounded-lg shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Did you know that a single bolt of lightning can power a 100-watt light bulb for up to 3 months?
        </motion.p>
      </motion.div>
    )
  }
];

export default function OnboardingTutorial({ onComplete, resetOnboarding }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  
  // Calculate progress percentage
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;
  
  // Handle navigation
  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    } else {
      handleComplete();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };
  
  const handleComplete = () => {
    setIsOpen(false);
    onComplete();
  };
  
  const step = tutorialSteps[currentStep];
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent 
        className="sm:max-w-md p-0 gap-0 bg-transparent border-none shadow-none"
        aria-describedby="onboarding-description"
      >
        <Card className="bg-white border-2 border-primary overflow-hidden">
          <div className="p-6">
            <DialogTitle className="sr-only">
              Inkwell Labs Onboarding Tutorial
            </DialogTitle>
            <div id="onboarding-description" className="sr-only">
              Inkwell Labs onboarding tutorial to help you navigate the platform effectively
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  {step.icon}
                  <h2 className="text-xl font-bold text-gray-800">{step.title}</h2>
                </div>
                
                {step.animation}
                
                <p className="text-gray-600 mb-6">{step.description}</p>
                
                <Progress value={progress} className="h-2 mb-2" />
                <div className="text-xs text-gray-500 mb-6 flex justify-between">
                  <span>Step {currentStep + 1} of {tutorialSteps.length}</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>
                  
                  <Button onClick={handleNext}>
                    {currentStep < tutorialSteps.length - 1 ? (
                      <>
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      'Get Started'
                    )}
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}