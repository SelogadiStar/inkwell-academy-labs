import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Hero() {
  const [frame, setFrame] = useState(0);
  
  // Simple animation using requestAnimationFrame
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setFrame(prev => (prev + 1) % 60); // 60 frames cycle
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  const labAnimationSvg = `
    <svg width="100%" height="100%" viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg">
      <!-- Lab background -->
      <rect x="0" y="0" width="500" height="350" fill="#f8f9fa" rx="10" />
      
      <!-- Lab desk -->
      <rect x="50" y="200" width="400" height="20" fill="#8B4513" rx="2" />
      <rect x="70" y="220" width="360" height="80" fill="#a0522d" rx="2" />
      
      <!-- Inkwell Labs logo as beaker with liquid -->
      <g transform="translate(420, 140) scale(0.6)">
        <path d="M60,20 L80,20 L100,140 L40,140 Z" fill="#fefefe" stroke="#333" stroke-width="3" />
        <rect x="50" y="10" width="40" height="10" fill="#0A1E42" rx="2" />
        
        <!-- Animated bubbling liquid -->
        <path d="M40,${120 + Math.sin(frame * 0.1) * 5} L100,${120 + Math.cos(frame * 0.1) * 5} L100,140 L40,140 Z" fill="#0A1E42" />
        
        <!-- Bubbles -->
        <circle cx="${55 + Math.sin(frame * 0.2) * 10}" cy="${100 + frame % 20}" r="4" fill="rgba(255,255,255,0.7)" />
        <circle cx="${75 + Math.cos(frame * 0.3) * 10}" cy="${110 + (frame + 10) % 20}" r="3" fill="rgba(255,255,255,0.7)" />
        <circle cx="${85 + Math.sin(frame * 0.4) * 5}" cy="${90 + (frame + 30) % 30}" r="5" fill="rgba(255,255,255,0.7)" />
        
        <!-- Text -->
        <text x="70" y="75" text-anchor="middle" fill="#0A1E42" font-weight="bold" font-family="Arial">INKWELL</text>
        <text x="70" y="90" text-anchor="middle" fill="#0A1E42" font-weight="bold" font-family="Arial">LABS</text>
      </g>
      
      <!-- Science equipment -->
      <g transform="translate(320, 150)">
        <rect x="0" y="0" width="20" height="50" fill="#ddd" />
        <rect x="5" y="5" width="10" height="40" fill="#0A1E42" />
        <circle cx="10" cy="0" r="8" fill="#eee" />
      </g>
      
      <!-- Students conducting experiments -->
      <!-- Black South African girl -->
      <g transform="translate(100, 160)">
        <!-- Head -->
        <circle cx="0" cy="0" r="20" fill="#5C3317" />
        
        <!-- Afro hair -->
        <circle cx="0" cy="-5" r="24" fill="#000" />
        
        <!-- Face -->
        <circle cx="-7" cy="-2" r="3" fill="#fff" />
        <circle cx="7" cy="-2" r="3" fill="#fff" />
        <circle cx="-7" cy="-2" r="1" fill="#000" />
        <circle cx="7" cy="-2" r="1" fill="#000" />
        <path d="M-5,8 Q0,12 5,8" stroke="#000" stroke-width="2" fill="none" />
        
        <!-- Body with uniform -->
        <rect x="-15" y="20" width="30" height="40" fill="#0A1E42" rx="5" />
        
        <!-- Arms -->
        <rect x="-25" y="25" width="10" height="60" fill="#5C3317" rx="5" transform="rotate(-20, -25, 25)" />
        <rect x="15" y="25" width="10" height="30" fill="#5C3317" rx="5" transform="rotate(30, 15, 25)" />
        
        <!-- Holding a test tube - animated -->
        <g transform="translate(-30, 60) rotate(${-10 + Math.sin(frame * 0.1) * 5})">
          <rect x="0" y="0" width="5" height="20" fill="#ddd" rx="2" />
          <rect x="1" y="2" width="3" height="15" fill="${frame % 20 < 10 ? '#FFD700' : '#0A1E42'}" />
        </g>
      </g>
      
      <!-- Black South African boy -->
      <g transform="translate(180, 170)">
        <!-- Head -->
        <circle cx="0" cy="0" r="18" fill="#432818" />
        
        <!-- Short hair -->
        <path d="M-18,-5 Q0,-15 18,-5 L18,0 L-18,0 Z" fill="#000" />
        
        <!-- Face -->
        <circle cx="-6" cy="-2" r="3" fill="#fff" />
        <circle cx="6" cy="-2" r="3" fill="#fff" />
        <circle cx="-6" cy="-2" r="1" fill="#000" />
        <circle cx="6" cy="-2" r="1" fill="#000" />
        <path d="M-5,8 Q0,12 5,8" stroke="#000" stroke-width="2" fill="none" />
        
        <!-- Lab coat -->
        <rect x="-20" y="18" width="40" height="40" fill="#fff" rx="5" />
        
        <!-- Arms -->
        <rect x="-30" y="25" width="10" height="30" fill="#432818" rx="5" transform="rotate(-45, -30, 25)" />
        <rect x="20" y="25" width="10" height="30" fill="#432818" rx="5" transform="rotate(45, 20, 25)" />
        
        <!-- Clipboard animated -->
        <g transform="translate(-35, 35) rotate(${Math.sin(frame * 0.1) * 3})">
          <rect x="0" y="0" width="20" height="25" fill="#D2B48C" rx="2" />
          <rect x="2" y="2" width="16" height="3" fill="#fff" />
          <rect x="2" y="7" width="16" height="3" fill="#fff" />
          <rect x="2" y="12" width="16" height="3" fill="#fff" />
        </g>
      </g>
      
      <!-- Indian South African girl -->
      <g transform="translate(250, 160)">
        <!-- Head -->
        <circle cx="0" cy="0" r="18" fill="#A67358" />
        
        <!-- Long hair -->
        <path d="M-15,-15 Q0,-25 15,-15 L18,20 L-18,20 Z" fill="#000" />
        
        <!-- Face -->
        <circle cx="-6" cy="-2" r="3" fill="#fff" />
        <circle cx="6" cy="-2" r="3" fill="#fff" />
        <circle cx="-6" cy="-2" r="1" fill="#000" />
        <circle cx="6" cy="-2" r="1" fill="#000" />
        <path d="M-5,7 Q0,10 5,7" stroke="#000" stroke-width="2" fill="none" />
        
        <!-- Body with school uniform -->
        <rect x="-15" y="18" width="30" height="40" fill="#FFD700" rx="5" />
        
        <!-- Arms -->
        <rect x="-20" y="25" width="10" height="30" fill="#A67358" rx="5" transform="rotate(-30, -20, 25)" />
        <rect x="10" y="25" width="10" height="30" fill="#A67358" rx="5" transform="rotate(30, 10, 25)" />
        
        <!-- Microscope - animated -->
        <g transform="translate(30, 50) scale(0.8) rotate(${Math.sin(frame * 0.1) * 2})">
          <rect x="-10" y="0" width="20" height="5" fill="#333" />
          <rect x="-2" y="-15" width="4" height="20" fill="#555" />
          <circle cx="0" cy="-20" r="7" fill="#777" />
        </g>
      </g>
      
      <!-- Chemical reaction - animated bubbles -->
      <g transform="translate(150, 210)">
        <rect x="0" y="0" width="30" height="20" fill="#ddd" rx="2" />
        <rect x="5" y="-10" width="20" height="10" fill="#bbb" />
        <circle cx="${15 + Math.sin(frame * 0.3) * 3}" cy="${-20 - (frame % 40)}" r="3" fill="#FFD700" opacity="${0.7 - (frame % 40) / 40}" />
        <circle cx="${15 + Math.cos(frame * 0.4) * 3}" cy="${-20 - (frame % 30)}" r="2" fill="#FFD700" opacity="${0.8 - (frame % 30) / 30}" />
        <circle cx="${15 + Math.sin(frame * 0.5) * 3}" cy="${-20 - (frame % 20)}" r="4" fill="#FFD700" opacity="${0.6 - (frame % 20) / 20}" />
      </g>
    </svg>
  `;

  return (
    <section className="bg-gradient-to-r from-navy to-navy-dark text-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h1 className="font-bold text-3xl md:text-5xl lg:text-6xl mb-2">
              Inkwell Labs <span className="text-gold">on the Go</span>
            </h1>
            <h2 className="font-medium text-xl md:text-2xl mb-6 text-gold-light">
              South African Science at Your Fingertips
            </h2>
            <p className="text-lg mb-6">
              Curriculum-aligned experiments for Grades 7-12 following NCS and CAPS standards.
              Transform complex science concepts into engaging, interactive learning experiences.
            </p>
            <div className="bg-navy-light p-4 rounded-lg mb-6">
              <div className="flex items-start">
                <span className="material-icons text-gold mr-2 mt-1">star</span>
                <p className="text-gold-light text-sm">
                  <span className="font-bold">Start with a 1-month free trial!</span> Science Buddy with daily facts remains available indefinitely with ads.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button className="bg-gold text-navy hover:bg-gold-dark rounded-full px-6 py-3 font-medium">
                Browse Experiments
              </Button>
              <Link href="/register">
                <Button variant="outline" className="border-2 border-gold text-gold hover:bg-gold hover:text-navy rounded-full px-6 py-3 font-medium">
                  Register Now
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <div 
              className="rounded-lg shadow-xl bg-white w-full max-w-md h-[350px] overflow-hidden"
              dangerouslySetInnerHTML={{ __html: labAnimationSvg }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
