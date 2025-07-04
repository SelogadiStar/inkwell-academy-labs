import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import labStudentsImg from "@assets/ChatGPT Image May 16, 2025 at 06_00_02 PM.png";

interface AdProps {
  position?: 'top' | 'bottom' | 'sidebar';
  type?: 'banner' | 'square' | 'rectangle';
}

// Using a mix of real images and SVG for representation
const generateAdContent = (id: number) => {
  // Use the real image for the first ad, SVG for others
  if (id === 1) {
    return `
      <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #007A4D; color: white; padding: 10px; position: relative;">
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('${labStudentsImg}') center/cover no-repeat;"></div>
        <div style="position: absolute; bottom: 10px; right: 10px; background-color: rgba(0, 0, 0, 0.7); color: white; padding: 5px 10px; border-radius: 4px; font-weight: bold; z-index: 2;">
          South African Curriculum
        </div>
        <div style="position: absolute; top: 10px; left: 10px; background-color: rgba(0, 122, 77, 0.8); color: white; padding: 5px 10px; border-radius: 4px; font-weight: bold; z-index: 2;">
          Inkwell Labs on the Go
        </div>
      </div>
    `;
  }
  
  // Colors for diverse skin tones focusing on Black South Africans
  const skinTones = [
    "#8D5524", "#C68642", "#E0AC69", "#F1C27D", "#FFDBAC", "#5C3317", "#694D3F", "#A67358", "#432818"
  ];
  
  // Generate a group of diverse students with a focus on Black South African youth
  const students = Array.from({ length: 6 }, (_, i) => {
    // Ensure majority are Black South African youths (70-80%)
    // Index 0-3 are darker skin tones, 4-8 are lighter tones
    const skinToneIndex = Math.random() < 0.8 ? 
      Math.floor(Math.random() * 4) : // 80% chance of darker skin tone (Black South African)
      Math.floor(Math.random() * 5) + 4; // 20% chance of other skin tones (multinational)
      
    const skinTone = skinTones[skinToneIndex];
    
    // Randomize between boy and girl
    const isGirl = Math.random() > 0.5;
    
    // Vary heights to show different ages (all school-age)
    const height = 45 + Math.random() * 25; // Different heights for kids
    const xPos = 20 + i * 50; // Position them evenly
    
    // Uniform colors for school uniforms with South African colors
    const uniformColors = ["#007A4D", "#DE3831", "#002395", "#FFB612"]; // SA flag colors
    const uniformColor = uniformColors[Math.floor(Math.random() * uniformColors.length)];
    
    return `
      <g transform="translate(${xPos}, 70)">
        <!-- head -->
        <circle cx="0" cy="-30" r="12" fill="${skinTone}" />
        
        <!-- hair style based on gender -->
        ${isGirl ? 
          `<circle cx="0" cy="-35" r="14" fill="#000000" />` : // afro/braided hairstyle for girls
          `<rect x="-10" y="-42" width="20" height="8" rx="2" fill="#000000" />`  // short hair for boys
        }
        
        <!-- school uniform -->
        <rect x="-10" y="-18" width="20" height="${height/2}" rx="2" fill="${uniformColor}" />
        
        <!-- face - ensure smiling expression -->
        <text x="0" y="-30" text-anchor="middle" font-size="8" fill="#000">😊</text>
        
        <!-- school books or science props in hand -->
        <rect x="${isGirl ? -15 : 5}" y="-10" width="10" height="15" fill="#f9c74f" transform="rotate(${isGirl ? 15 : -15}, ${isGirl ? -15 : 5}, -10)" />
      </g>
    `;
  });
  
  // Create SVG with South African flag colors and students
  return `
    <svg width="100%" height="100%" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg${id}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#007A4D" />
          <stop offset="33%" style="stop-color:#FFF" />
          <stop offset="66%" style="stop-color:#000" />
          <stop offset="100%" style="stop-color:#DE3831" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg${id})" />
      <text x="150" y="30" text-anchor="middle" fill="white" font-weight="bold" font-size="16">Inkwell Labs on the Go</text>
      ${students.join('')}
      <text x="150" y="120" text-anchor="middle" fill="white" font-weight="bold" font-size="14">Learn Science the South African Way!</text>
    </svg>
  `;
};

const adContent = [
  {
    title: "Science Lab Skills",
    description: "Learn proper measurement techniques with graduated cylinders and other lab equipment.",
    image: generateAdContent(1) // Real image of South African students in lab
  },
  {
    title: "Biology Made Easy",
    description: "Explore the wonders of life science with hands-on activities for every grade.",
    image: generateAdContent(2)
  },
  {
    title: "Physics in Everyday Life",
    description: "See how physics principles apply all around you with our experiments.",
    image: generateAdContent(3)
  },
  {
    title: "Subscribe Today",
    description: "Get unlimited access to all experiments for only R100 per year!",
    image: generateAdContent(4)
  }
];

export default function Advertising({ position = 'bottom', type = 'banner' }: AdProps) {
  const [currentAd, setCurrentAd] = useState(0);
  
  // Rotate ads every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % adContent.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);
  
  const ad = adContent[currentAd];
  
  const getClassNames = () => {
    let classes = "overflow-hidden transition-all duration-300 ";
    
    // Position classes
    if (position === 'top') {
      classes += "w-full mb-6 ";
    } else if (position === 'bottom') {
      classes += "w-full mt-6 ";
    } else if (position === 'sidebar') {
      classes += "w-full lg:w-64 ";
    }
    
    // Type classes
    if (type === 'banner') {
      classes += "h-24 md:h-28 ";
    } else if (type === 'square') {
      classes += "h-64 w-64 ";
    } else if (type === 'rectangle') {
      classes += "h-60 ";
    }
    
    return classes;
  };
  
  return (
    <Card className={getClassNames()}>
      <CardContent className="p-0 h-full">
        <div className="h-full flex flex-col md:flex-row overflow-hidden relative">
          <div 
            className="md:w-1/2 h-full flex items-center justify-center p-2"
            dangerouslySetInnerHTML={{ __html: ad.image }}
          />
          <div className="md:w-1/2 p-3 flex flex-col justify-center bg-gradient-to-r from-gray-50 to-gray-100">
            <h3 className="font-bold text-primary mb-1">{ad.title}</h3>
            <p className="text-sm text-gray-700">{ad.description}</p>
          </div>
          <div className="absolute top-1 right-1 text-xs bg-gray-200 text-gray-500 px-1 rounded">
            Ad
          </div>
        </div>
      </CardContent>
    </Card>
  );
}