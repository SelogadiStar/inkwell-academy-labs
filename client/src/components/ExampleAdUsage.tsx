import AdManager from './AdManager';

export default function ExampleAdUsage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Ad Integration Examples</h2>
      
      <div className="space-y-8">
        {/* Example 1: Using custom ads (your South African students image) */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Custom Ad (Banner)</h3>
          <p className="mb-4 text-gray-700">This displays your custom Inkwell Labs ad with South African students</p>
          <AdManager 
            position="bottom" 
            type="banner"
            useGoogleAds={false} 
          />
        </div>
        
        {/* Example 2: Using Google AdSense */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Google AdSense (Rectangle)</h3>
          <p className="mb-4 text-gray-700">This displays a Google AdSense ad</p>
          <AdManager 
            position="sidebar" 
            type="rectangle"
            useGoogleAds={true}
            googleAdClient={process.env.GOOGLE_ADSENSE_CLIENT || "YOUR-PUBLISHER-ID"}
            googleAdSlot={process.env.GOOGLE_ADSENSE_SLOT || "YOUR-AD-SLOT-ID"} // Replace with your actual ad slot ID from AdSense dashboard
          />
        </div>
        
        {/* Integration tips */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">AdSense Integration Tips</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Create ad units in your Google AdSense dashboard to get slot IDs</li>
            <li>Replace the googleAdSlot="1234567890" with your actual slot ID</li>
            <li>Place AdManager components strategically throughout your app layouts</li>
            <li>Remember to comply with Google AdSense policies regarding ad placement</li>
            <li>Test your ads in both desktop and mobile views</li>
          </ul>
        </div>
      </div>
    </div>
  );
}