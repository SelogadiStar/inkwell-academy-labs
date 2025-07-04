import express from 'express';
import { createServer } from 'http';

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging function
function log(message: string) {
  const time = new Date().toLocaleTimeString();
  console.log(`${time} [server] ${message}`);
}

// Health check - critical for Replit detection
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    port: process.env.PORT || 5000
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Main application route
app.get('*', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Inkwell Academy Labs</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div class="container mx-auto px-4 py-16">
          <div class="text-center mb-12">
            <h1 class="text-5xl font-bold text-blue-600 mb-4">Inkwell Academy Labs</h1>
            <p class="text-xl text-gray-700 mb-2">South African Multi-Subject Learning Platform</p>
            <p class="text-sm text-gray-600">Aligned with CAPS Curriculum • Grades 7-12</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border-t-4 border-green-500">
              <div class="text-center">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"></path>
                  </svg>
                </div>
                <h2 class="text-2xl font-bold text-green-600 mb-3">Science Labs</h2>
                <p class="text-gray-600 mb-4">Interactive laboratory experiments with step-by-step guidance</p>
                <div class="text-sm text-gray-500">
                  <p>• Physics • Chemistry • Biology</p>
                  <p>• Earth Sciences • AR/VR Labs</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border-t-4 border-purple-500">
              <div class="text-center">
                <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <h2 class="text-2xl font-bold text-purple-600 mb-3">English that Speaks</h2>
                <p class="text-gray-600 mb-4">Dynamic language learning with interactive content</p>
                <div class="text-sm text-gray-500">
                  <p>• Reading Comprehension</p>
                  <p>• Creative Writing • Grammar</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border-t-4 border-orange-500">
              <div class="text-center">
                <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h2 class="text-2xl font-bold text-orange-600 mb-3">Mathematics that Clicks</h2>
                <p class="text-gray-600 mb-4">Visual math concepts with interactive problem solving</p>
                <div class="text-sm text-gray-500">
                  <p>• Algebra • Geometry</p>
                  <p>• Calculus • Statistics</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="text-center mt-12">
            <p class="text-gray-600 mb-4">🇿🇦 Proudly South African • CAPS Curriculum Aligned</p>
            <div class="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm">
              <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              System Online - Ready for Learning
            </div>
          </div>
        </div>
      </body>
    </html>
  `);
});

// Create HTTP server
const server = createServer(app);

// Start server function
export function startServer() {
  const PORT = parseInt(process.env.PORT || '5000', 10);
  
  return new Promise<void>((resolve, reject) => {
    server.listen(PORT, '0.0.0.0', () => {
      log(`Server running on port ${PORT}`);
      log('Application ready and listening');
      console.log(`🚀 Server started successfully on http://0.0.0.0:${PORT}`);
      resolve();
    });
    
    server.on('error', (err: any) => {
      console.error('Server error:', err);
      reject(err);
    });
  });
}

export { app, server };