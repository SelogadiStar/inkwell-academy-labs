import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const SUBSCRIPTION_PLANS = [
  {
    id: 1,
    name: "6-Month Access",
    price: 60,
    description: "Access to all experiments and resources for 6 months",
    features: [
      "Full access to all grade-specific experiments",
      "Downloadable materials and worksheets",
      "Mobile app access",
      "Ad-supported experience",
      "Science Buddy AI assistant included"
    ],
    durationMonths: 6,
    freeTrialDays: 30
  },
  {
    id: 2,
    name: "Annual Access",
    price: 100,
    description: "Best value! Full access for 12 months",
    features: [
      "Everything in 6-Month Access",
      "Priority support",
      "Early access to new experiments",
      "Ad-supported experience",
      "Science Buddy AI assistant included"
    ],
    durationMonths: 12,
    freeTrialDays: 30,
    recommended: true
  }
];

export default function Subscribe() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSubscribe = () => {
    if (!selectedPlan) {
      toast({
        title: "Please select a plan",
        description: "Select a subscription plan to continue.",
        variant: "destructive"
      });
      return;
    }

    // This will be replaced with Stripe integration once we have the API keys
    toast({
      title: "Subscription feature coming soon!",
      description: "The payment system is currently being set up. Please check back later."
    });
  };

  return (
    <>
      <Helmet>
        <title>Subscribe - Inkwell Labs on the Go</title>
        <meta name="description" content="Subscribe to Inkwell Labs on the Go for full access to curriculum-aligned science experiments for South African students Grades 7-12." />
      </Helmet>

      <section className="bg-primary py-12 md:py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-roboto font-bold text-3xl md:text-4xl mb-4">Subscribe to Inkwell Labs on the Go</h1>
          <p className="max-w-3xl mx-auto text-lg">
            Get unlimited access to all South African curriculum-aligned experiments and resources. 
            Take your science education to the next level with our comprehensive platform.
          </p>
        </div>
      </section>

      <section className="py-16 bg-lightBg">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-roboto font-bold text-3xl text-darkText mb-4">Choose Your Subscription Plan</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Select a plan that works for you. All plans include a 1-month free trial and access to our mobile app and web platform.
              </p>
              <div className="mt-4 bg-blue-50 text-blue-700 p-4 rounded-lg max-w-2xl mx-auto">
                <div className="flex items-center">
                  <span className="material-icons mr-2">info</span>
                  <p className="text-sm font-medium">Science Buddy with daily facts will remain available indefinitely, even without a subscription!</p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {SUBSCRIPTION_PLANS.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`overflow-hidden transition-all duration-300 ${
                    selectedPlan === plan.id ? "ring-2 ring-primary" : "hover:shadow-lg"
                  } ${plan.recommended ? "relative" : ""}`}
                >
                  {plan.recommended && (
                    <div className="absolute top-0 right-0 bg-primary text-white text-xs px-3 py-1 font-medium">
                      BEST VALUE
                    </div>
                  )}
                  
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="mb-6">
                      <p className="text-3xl font-bold flex items-baseline">
                        R{plan.price} 
                        <span className="text-sm text-gray-500 ml-1">
                          /{plan.durationMonths === 12 ? "year" : "6 months"}
                        </span>
                      </p>
                    </div>
                    
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="material-icons text-primary mr-2 text-sm">check_circle</span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className={`w-full py-2 ${
                        selectedPlan === plan.id ? "bg-primary" : "bg-white border border-primary text-primary hover:bg-primary/10"
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                className="bg-primary text-white py-6 px-8 text-lg font-medium rounded-full"
                onClick={handleSubscribe}
                disabled={!selectedPlan}
              >
                Continue to Payment
              </Button>
              <p className="mt-4 text-sm text-gray-500">
                All subscriptions include a 1-month free trial. You won't be charged until your trial ends.
                By subscribing, you agree to our Terms of Service and Privacy Policy.
                Subscriptions automatically renew unless canceled before the renewal date.
              </p>
              
              <div className="mt-8 p-4 bg-white rounded-lg shadow-sm max-w-xl mx-auto">
                <h3 className="font-medium text-darkText mb-2">Secure Payment</h3>
                <div className="flex items-center justify-center space-x-4">
                  <span className="material-icons text-gray-400">lock</span>
                  <p className="text-gray-600 text-sm">
                    We use Stripe for secure payment processing. Your payment information is never stored on our servers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}