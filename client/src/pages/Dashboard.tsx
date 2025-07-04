import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth, UserData } from '@/hooks/useAuth';

export default function Dashboard() {
  const { user, logout, getUserData } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [, setLocation] = useLocation();

  const grades = [7, 8, 9, 10, 11, 12];

  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        const data = await getUserData(user.uid);
        if (data) {
          setUserData(data);
          if (data.grade) {
            setSelectedGrade(data.grade);
          }
        }
      }
    };
    loadUserData();
  }, [user, getUserData]);

  const handleLogout = async () => {
    await logout();
  };

  const handleGradeSelect = (gradeNum: number) => {
    setSelectedGrade(gradeNum);
    localStorage.setItem('grade', gradeNum.toString());
  };

  const handleSubjectClick = (subject: string) => {
    if (selectedGrade) {
      setLocation(`/${subject}?grade=${selectedGrade}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {userData?.name || user?.displayName || 'Student'}!
            </h1>
            <p className="text-gray-600">
              Membership: {userData?.membership || 'Loading...'}
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-800"
          >
            Logout
          </Button>
        </div>

        {/* Grade Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-center">Select Your Grade</CardTitle>
            <CardDescription className="text-center">
              Choose your current grade level to access relevant content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {grades.map((gradeNum) => (
                <Button
                  key={gradeNum}
                  variant={selectedGrade === gradeNum ? "default" : "outline"}
                  className={`p-4 h-auto ${
                    selectedGrade === gradeNum 
                      ? 'bg-blue-600 text-white' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => handleGradeSelect(gradeNum)}
                >
                  <div className="text-center">
                    <div className="text-lg font-semibold">Grade {gradeNum}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subject Selection - Only show when grade is selected */}
        {selectedGrade && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Choose a Subject
              </h2>
              <p className="text-gray-600">Grade {selectedGrade} Content</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => handleSubjectClick('science')}
              >
                <CardHeader className="text-center">
                  <div className="text-5xl mb-4">🧪</div>
                  <CardTitle className="text-green-600 text-xl">Science Labs on the Go</CardTitle>
                  <CardDescription className="text-sm">
                    Interactive experiments and simulations aligned with CAPS curriculum
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => handleSubjectClick('english')}
              >
                <CardHeader className="text-center">
                  <div className="text-5xl mb-4">📚</div>
                  <CardTitle className="text-purple-600 text-xl">English That Speaks</CardTitle>
                  <CardDescription className="text-sm">
                    Language learning, literature, and communication skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => handleSubjectClick('maths')}
              >
                <CardHeader className="text-center">
                  <div className="text-5xl mb-4">🔢</div>
                  <CardTitle className="text-orange-600 text-xl">Maths That Clicks</CardTitle>
                  <CardDescription className="text-sm">
                    Problem solving, calculations, and mathematical reasoning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}