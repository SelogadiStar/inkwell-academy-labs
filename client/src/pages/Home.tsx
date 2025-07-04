import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FlaskConical, BookOpen, Calculator, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to Inkwell Academy Labs</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Your comprehensive digital platform for South African education, empowering Grades 7-12 learners 
            through interactive and curriculum-aligned tools.
          </p>
          <div className="space-x-4">
            <Link href="/science">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Explore Science Labs
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Subject Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Learning Path</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Science */}
            <Link href="/science">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-green-500">
                <FlaskConical className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-green-600">Science Labs on the Go</h3>
                <p className="text-gray-600 mb-4">Interactive science experiments aligned with South African curriculum (Grades 7-12)</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Physics experiments</li>
                  <li>• Chemistry simulations</li>
                  <li>• Biology studies</li>
                  <li>• AR/VR lab experiences</li>
                </ul>
              </div>
            </Link>

            {/* English */}
            <Link href="/english">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-purple-500">
                <BookOpen className="h-12 w-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-purple-600">English that Speaks</h3>
                <p className="text-gray-600 mb-4">Comprehensive English language learning tools and resources</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Grammar practice</li>
                  <li>• Reading comprehension</li>
                  <li>• Writing workshops</li>
                  <li>• Speaking exercises</li>
                </ul>
              </div>
            </Link>

            {/* Math */}
            <Link href="/math">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-orange-500">
                <Calculator className="h-12 w-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-orange-600">Mathematics that Clicks</h3>
                <p className="text-gray-600 mb-4">Interactive mathematics tools and problem-solving resources</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Algebra practice</li>
                  <li>• Geometry tools</li>
                  <li>• Statistics modules</li>
                  <li>• Problem solving</li>
                </ul>
              </div>
            </Link>

            {/* Dashboard */}
            <Link href="/dashboard">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-blue-500">
                <TrendingUp className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-blue-600">Student Dashboard</h3>
                <p className="text-gray-600 mb-4">Track your learning progress across all subjects</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Progress tracking</li>
                  <li>• Achievement system</li>
                  <li>• Performance analytics</li>
                  <li>• Learning goals</li>
                </ul>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About Inkwell Academy</h2>
            <p className="text-lg text-gray-700 mb-8">
              Inkwell Academy is a comprehensive digital platform for South African education, empowering learners 
              in Grades 7-12 through interactive and curriculum-aligned tools. Our platform combines traditional 
              learning with cutting-edge technology including AR/VR experiences, making education engaging and accessible.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">7-12</span>
                </div>
                <h3 className="font-semibold mb-2">Grade Coverage</h3>
                <p className="text-gray-600">Complete curriculum for Grades 7-12</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">3D</span>
                </div>
                <h3 className="font-semibold mb-2">AR/VR Ready</h3>
                <p className="text-gray-600">Immersive learning experiences</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">SA</span>
                </div>
                <h3 className="font-semibold mb-2">CAPS Aligned</h3>
                <p className="text-gray-600">South African curriculum standards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl mb-8">Join thousands of students already using Inkwell Academy</p>
          <div className="space-x-4">
            <Link href="/register">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Register Now
              </Button>
            </Link>
            <Link href="/subscribe">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                View Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}