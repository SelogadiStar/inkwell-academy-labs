import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function AppPromotion() {
  return (
    <section className="py-16 bg-primary bg-opacity-5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h2 className="font-roboto font-bold text-3xl text-darkText mb-4">Inkwell Labs on the Go</h2>
            <p className="text-gray-700 mb-6">Access all experiments anytime, anywhere with our mobile app. Available for both Android and iOS devices.</p>
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <h3 className="font-medium text-lg mb-2">Subscription Options:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-primary rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">6 Months</span>
                    <span className="text-xl font-bold text-primary">R60</span>
                  </div>
                  <p className="text-sm text-gray-600">Perfect for short-term projects</p>
                </div>
                <div className="border border-primary rounded-lg p-3 bg-primary bg-opacity-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Annual</span>
                    <span className="text-xl font-bold text-primary">R100</span>
                  </div>
                  <p className="text-sm text-gray-600">Best value for full year access</p>
                </div>
              </div>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="material-icons text-primary mr-2">check_circle</span>
                <span>Offline access to all experiments</span>
              </li>
              <li className="flex items-start">
                <span className="material-icons text-primary mr-2">check_circle</span>
                <span>Interactive step-by-step guides</span>
              </li>
              <li className="flex items-start">
                <span className="material-icons text-primary mr-2">check_circle</span>
                <span>Video demonstrations for complex procedures</span>
              </li>
              <li className="flex items-start">
                <span className="material-icons text-primary mr-2">check_circle</span>
                <span>Ad-supported experience</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button className="bg-gray-900 text-white rounded-lg px-6 py-3 font-roboto font-medium flex items-center justify-center">
                <span className="material-icons mr-2">phone_android</span>
                Google Play
              </Button>
              <Button className="bg-gray-900 text-white rounded-lg px-6 py-3 font-roboto font-medium flex items-center justify-center">
                <span className="material-icons mr-2">phone_iphone</span>
                App Store
              </Button>
              <Link href="/subscription">
                <Button className="bg-primary text-white rounded-lg px-6 py-3 font-roboto font-medium flex items-center justify-center">
                  <span className="material-icons mr-2">subscriptions</span>
                  Subscribe
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-2/5 flex justify-center">
            <div className="app-preview bg-white rounded-3xl p-2 max-w-xs">
              <div className="bg-gray-100 rounded-2xl overflow-hidden">
                <img 
                  src="https://pixabay.com/get/g20e73e941bf9b22258d096fbae7bfcbf31c9f85a8c50784f6adb25b139181eed6545e22a4e01656cb11f4c88ac96c4d02f8fb50c8278871bbed09db653b74094_1280.jpg" 
                  alt="Mobile app screenshot showing experiment interface" 
                  className="w-full h-auto" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
