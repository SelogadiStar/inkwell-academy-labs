import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Please enter your email",
        variant: "destructive",
      });
      return;
    }

    // In a real application, we would send this to an API
    toast({
      title: "Thank you for subscribing!",
      description: "You'll receive updates on new experiments and resources.",
    });
    setEmail("");
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-roboto font-bold text-2xl text-darkText mb-4">Stay Updated with New Experiments</h2>
          <p className="text-gray-600 mb-6">Subscribe to our newsletter to receive the latest experiments, teaching resources, and updates.</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <Input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow rounded-lg px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" className="bg-primary text-white rounded-lg px-6 py-3 font-roboto font-medium">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
