import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

export default function ScienceHome() {
  const { user } = useAuth();
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split('?')[1]);
  const grade = urlParams.get('grade') || '7';

  const experiments = [
    {
      id: 1,
      title: 'Simple Electric Circuit',
      description: 'Build your first working circuit with LEDs and batteries',
      duration: '30 min',
      difficulty: 'Beginner',
      icon: '⚡',
      category: 'Physics'
    },
    {
      id: 2,
      title: 'Cell Structure Observation',
      description: 'Explore plant and animal cells under the microscope',
      duration: '45 min',
      difficulty: 'Intermediate',
      icon: '🧬',
      category: 'Biology'
    },
    {
      id: 3,
      title: 'Chemical Reactions',
      description: 'Safe experiments with acids, bases, and indicators',
      duration: '40 min',
      difficulty: 'Intermediate',
      icon: '🧪',
      category: 'Chemistry'
    },
    {
      id: 4,
      title: 'States of Matter',
      description: 'Investigate solids, liquids, and gases',
      duration: '35 min',
      difficulty: 'Beginner',
      icon: '❄️',
      category: 'Chemistry'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/dashboard">
              <Button variant="outline" className="mb-4">
                ← Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-green-600 mb-2">Science Labs on the Go</h1>
            <p className="text-gray-600">Grade {grade} • Interactive CAPS-aligned experiments</p>
          </div>
          <div className="text-sm text-gray-500">
            Welcome, {user?.displayName}
          </div>
        </div>

        {/* Grade Indicator */}
        <Card className="mb-8 bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-2xl">🎯</div>
              <div>
                <h3 className="font-semibold text-green-800">Current Selection: Grade {grade}</h3>
                <p className="text-green-600 text-sm">Curriculum-aligned experiments for your level</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Experiments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {experiments.map((experiment) => (
            <Card key={experiment.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{experiment.icon}</div>
                    <div>
                      <CardTitle className="text-lg text-gray-800">{experiment.title}</CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {experiment.category} • {experiment.duration}
                      </CardDescription>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    experiment.difficulty === 'Beginner' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {experiment.difficulty}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{experiment.description}</p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Start Experiment
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon */}
        <Card className="mt-8 border-dashed border-2 border-gray-300">
          <CardContent className="p-8 text-center">
            <div className="text-4xl mb-4">🔬</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">More Experiments Coming Soon!</h3>
            <p className="text-gray-600">
              We're continuously adding new CAPS-aligned experiments for Grade {grade} students.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}