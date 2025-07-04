import { useEffect } from 'react';

interface GoogleAdsenseProps {
  client: string;
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  style?: React.CSSProperties;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

/**
 * GoogleAdsense component that renders Google AdSense ads
 * 
 * You'll need to add your AdSense script to the index.html head:
 * <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID" crossorigin="anonymous"></script>
 */
export default function GoogleAdsense({ 
  client, 
  slot, 
  format = 'auto', 
  style = { display: 'block' },
  className = ''
}: GoogleAdsenseProps) {
  useEffect(() => {
    // Push the ad to the adsbygoogle array when the component mounts
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      } else {
        console.warn('AdSense not loaded yet');
      }
    } catch (error) {
      console.error('Error initializing AdSense:', error);
    }
  }, []);

  return (
    <div className={`google-adsense ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
      />
    </div>
  );
}