import { useState, useEffect } from "react";
import Advertising from "./Advertising";
import GoogleAdsense from "./GoogleAdsense";
import { Card } from "@/components/ui/card";

interface AdManagerProps {
  position?: 'top' | 'bottom' | 'sidebar';
  type?: 'banner' | 'square' | 'rectangle';
  useGoogleAds?: boolean;
  googleAdClient?: string;
  googleAdSlot?: string;
}

/**
 * AdManager component that can display either custom ads or Google AdSense ads
 * depending on configuration
 */
export default function AdManager({ 
  position = 'bottom', 
  type = 'banner',
  useGoogleAds = false,
  googleAdClient = '',
  googleAdSlot = ''
}: AdManagerProps) {
  const [showAd, setShowAd] = useState(true);
  const [isSubscriber, setIsSubscriber] = useState(false);
  
  // Check if user is a subscriber (would come from your auth system)
  useEffect(() => {
    // This would be replaced with actual subscription check logic
    const checkSubscriptionStatus = () => {
      // Mock implementation - in real app, would check user subscription status
      const hasSubscription = localStorage.getItem('hasActiveSubscription') === 'true';
      setIsSubscriber(hasSubscription);
    };
    
    checkSubscriptionStatus();
  }, []);
  
  // Only show ads to non-subscribers
  if (isSubscriber || !showAd) {
    return null;
  }
  
  // Format for Google AdSense based on our ad type
  const getAdSenseFormat = () => {
    switch (type) {
      case 'square':
        return 'rectangle';
      case 'rectangle':
        return 'horizontal';
      case 'banner':
      default:
        return 'auto';
    }
  };
  
  // Styling for Google AdSense based on position
  const getAdSenseStyle = (): React.CSSProperties => {
    const baseStyle = { display: 'block' };
    
    if (position === 'sidebar') {
      return { ...baseStyle, width: '300px', height: '600px' };
    } else if (type === 'banner') {
      return { ...baseStyle, width: '100%', height: '90px' };
    } else if (type === 'square') {
      return { ...baseStyle, width: '336px', height: '280px' };
    } else {
      return { ...baseStyle, width: '100%', height: '250px' };
    }
  };
  
  // If using Google AdSense and we have the required props
  if (useGoogleAds && googleAdClient && googleAdSlot) {
    return (
      <Card className="relative overflow-hidden my-4">
        <GoogleAdsense
          client={googleAdClient}
          slot={googleAdSlot}
          format={getAdSenseFormat()}
          style={getAdSenseStyle()}
        />
        <div className="absolute top-1 right-1 text-xs bg-gray-200 text-gray-500 px-1 rounded">
          Ad
        </div>
      </Card>
    );
  }
  
  // Default to our custom ad system
  return <Advertising position={position} type={type} />;
}