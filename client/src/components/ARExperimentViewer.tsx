import { useState } from 'react';
import type { ExperimentType } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface ARExperimentViewerProps {
  experiment: ExperimentType;
  onClose: () => void;
}

export default function ARExperimentViewer({ experiment, onClose }: ARExperimentViewerProps) {
  const [activeTab, setActiveTab] = useState<string>("model");
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // For demo/placeholder purposes
  const modelImageUrl = experiment.imageUrl;
  const instructionsText = experiment.arInstructions || 
    "This 3D model allows you to visualize the experiment setup before conducting it in real life. In the future, you'll be able to view this in AR directly.";

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-bold text-navy">Interactive 3D Preview</h2>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onClose}
          className="rounded-full"
        >
          <span className="material-icons">close</span>
        </Button>
      </div>

      <Tabs defaultValue="model" className="w-full" onValueChange={handleTabChange}>
        <div className="p-4 border-b bg-gray-50">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="model" className="text-sm">
              3D Model
            </TabsTrigger>
            <TabsTrigger value="instructions" className="text-sm">
              Instructions
            </TabsTrigger>
            <TabsTrigger value="details" className="text-sm">
              Details
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="model" className="p-0 m-0">
          <div className="relative bg-gray-900 h-[60vh] flex items-center justify-center">
            {/* Placeholder for 3D model viewer */}
            <div className="text-center p-6">
              <div className="relative mx-auto mb-8 w-64 h-64 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFA500] opacity-20 rounded-full animate-pulse"></div>
                <img 
                  src={modelImageUrl} 
                  alt={experiment.title} 
                  className="h-full w-full object-contain rounded-lg z-10"
                />
              </div>
              <Badge className="mb-4 bg-[#FFD700] text-navy hover:bg-[#FFC700]">
                3D Preview Mode
              </Badge>
              <p className="text-white text-sm max-w-md mx-auto">
                Interact with the 3D model to understand the experiment setup and components.
              </p>
            </div>
          </div>
          <div className="flex justify-center p-4 gap-4">
            <Button className="bg-navy text-white hover:bg-navy/90">
              <span className="material-icons mr-2 text-sm">rotate_90_degrees_ccw</span>
              Rotate
            </Button>
            <Button className="bg-[#FFD700] text-navy hover:bg-[#FFD700]/90">
              <span className="material-icons mr-2 text-sm">zoom_in</span>
              Zoom
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="instructions" className="p-6 m-0">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-navy mb-4">How to Use the 3D Model</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700 mb-4">{instructionsText}</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="material-icons text-blue-600 mr-2">touch_app</span>
                  <span>Use one finger to rotate the model</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-blue-600 mr-2">pinch</span>
                  <span>Pinch with two fingers to zoom in and out</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-blue-600 mr-2">pan_tool</span>
                  <span>Drag with two fingers to move the model</span>
                </li>
              </ul>
            </div>
            
            <h3 className="text-lg font-semibold text-navy mb-2">Coming Soon</h3>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-gray-700">
                Full Augmented Reality support is coming soon! You'll be able to place this
                experiment in your real environment using your device's camera.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="details" className="p-6 m-0">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-navy mb-4">Experiment Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-navy mb-2">Main Components</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <span className="material-icons text-gray-400 mr-2 text-sm">check_circle</span>
                    <span>Experiment apparatus</span>
                  </li>
                  <li className="flex items-center">
                    <span className="material-icons text-gray-400 mr-2 text-sm">check_circle</span>
                    <span>Measuring instruments</span>
                  </li>
                  <li className="flex items-center">
                    <span className="material-icons text-gray-400 mr-2 text-sm">check_circle</span>
                    <span>Safety equipment</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-navy mb-2">Technical Specifications</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <span className="material-icons text-gray-400 mr-2 text-sm">info</span>
                    <span>Model Type: Interactive 3D</span>
                  </li>
                  <li className="flex items-center">
                    <span className="material-icons text-gray-400 mr-2 text-sm">info</span>
                    <span>Compatible Devices: All browsers</span>
                  </li>
                  <li className="flex items-center">
                    <span className="material-icons text-gray-400 mr-2 text-sm">info</span>
                    <span>AR Support: Coming soon</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#1D3461] to-[#1F487E] p-4 rounded-lg text-white">
              <h4 className="font-medium mb-2 flex items-center">
                <span className="material-icons mr-2">school</span>
                Curriculum Connection
              </h4>
              <p className="text-sm">
                This 3D model is designed to help visualize concepts from the 
                South African National Curriculum Statement (NCS) and CAPS for Grade {experiment.gradeId}.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}