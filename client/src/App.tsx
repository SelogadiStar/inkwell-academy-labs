import { Router, Route, Switch } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@/hooks/useAuth';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import ProtectedRoute from '@/components/ProtectedRoute';
import ExperimentDetail from '@/pages/ExperimentDetail';
import ProgressDashboard from '@/pages/ProgressDashboard';
import Subscribe from '@/pages/Subscribe';
import NotFound from '@/pages/not-found';
import ScienceHome from '@/pages/science/Home';
import EnglishHome from '@/pages/english/Home';
import MathHome from '@/pages/math/Home';

const queryClient = new QueryClient();

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-lg font-bold">IA</span>
          </div>
          <div className="text-gray-600">Loading Inkwell Academy...</div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard">
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </Route>
        <Route path="/experiment/:id">
          <ProtectedRoute>
            <ExperimentDetail />
          </ProtectedRoute>
        </Route>
        <Route path="/progress">
          <ProtectedRoute>
            <ProgressDashboard />
          </ProtectedRoute>
        </Route>
        <Route path="/subscribe">
          <ProtectedRoute>
            <Subscribe />
          </ProtectedRoute>
        </Route>
        <Route path="/science">
          <ProtectedRoute>
            <ScienceHome />
          </ProtectedRoute>
        </Route>
        <Route path="/english">
          <ProtectedRoute>
            <EnglishHome />
          </ProtectedRoute>
        </Route>
        <Route path="/math">
          <ProtectedRoute>
            <MathHome />
          </ProtectedRoute>
        </Route>
        <Route path="/maths">
          <ProtectedRoute>
            <MathHome />
          </ProtectedRoute>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;