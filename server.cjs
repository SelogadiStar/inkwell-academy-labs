const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', port: 5000, timestamp: new Date().toISOString() });
});

// Main route
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inkwell Academy Labs</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    .tab-content { display: none; }
    .tab-content.active { display: block; }
    .tab-button.active { 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      min-height: 100vh;
    }
  </style>
</head>
<body class="min-h-screen">
  <div class="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
    <div class="max-w-md mx-auto">
      <h1 class="text-xl font-bold text-gray-800 text-center">Inkwell Academy</h1>
      <p class="text-xs text-gray-500 text-center">CAPS Aligned • Grades 7-12</p>
    </div>
  </div>

  <div class="max-w-md mx-auto bg-white min-h-screen">
    <div class="grid grid-cols-3 gap-0 bg-gray-50 p-2">
      <button onclick="showTab('science')" id="science-tab" class="tab-button active px-3 py-4 rounded-lg text-sm font-medium transition-all duration-200 flex flex-col items-center space-y-1">
        <div class="text-2xl">🧪</div>
        <div class="text-xs">Labs on</div>
        <div class="text-xs font-bold">the Go</div>
      </button>
      <button onclick="showTab('english')" id="english-tab" class="tab-button px-3 py-4 rounded-lg text-sm font-medium transition-all duration-200 flex flex-col items-center space-y-1 text-gray-600">
        <div class="text-2xl">📚</div>
        <div class="text-xs">English That</div>
        <div class="text-xs font-bold">Speaks</div>
      </button>
      <button onclick="showTab('maths')" id="maths-tab" class="tab-button px-3 py-4 rounded-lg text-sm font-medium transition-all duration-200 flex flex-col items-center space-y-1 text-gray-600">
        <div class="text-2xl">🔢</div>
        <div class="text-xs">Maths That</div>
        <div class="text-xs font-bold">Clicks</div>
      </button>
    </div>

    <div class="p-4">
      <div id="science-content" class="tab-content active">
        <div class="space-y-4">
          <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-green-600 mb-2">Science Labs on the Go</h2>
            <p class="text-gray-600 text-sm">Interactive experiments aligned with CAPS curriculum</p>
          </div>
          
          <div class="bg-gray-50 rounded-xl p-4">
            <h3 class="font-semibold text-gray-700 mb-3">Select Your Grade</h3>
            <div class="grid grid-cols-3 gap-2">
              <button class="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium">Grade 7</button>
              <button class="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium">Grade 8</button>
              <button class="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium">Grade 9</button>
              <button class="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium">Grade 10</button>
              <button class="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium">Grade 11</button>
              <button class="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium">Grade 12</button>
            </div>
          </div>

          <div class="space-y-3">
            <h3 class="font-semibold text-gray-700">Popular Experiments</h3>
            <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span class="text-xl">⚡</span>
                </div>
                <div class="flex-1">
                  <h4 class="font-medium text-gray-800">Simple Circuit</h4>
                  <p class="text-xs text-gray-500">Physics • 30 min</p>
                </div>
                <button class="text-green-600 text-sm font-medium">Start</button>
              </div>
            </div>
            <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span class="text-xl">🧬</span>
                </div>
                <div class="flex-1">
                  <h4 class="font-medium text-gray-800">Cell Structure</h4>
                  <p class="text-xs text-gray-500">Biology • 45 min</p>
                </div>
                <button class="text-green-600 text-sm font-medium">Start</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="english-content" class="tab-content">
        <div class="space-y-4">
          <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-purple-600 mb-2">English That Speaks</h2>
            <p class="text-gray-600 text-sm">Comprehensive language learning tools</p>
          </div>
          
          <div class="space-y-3">
            <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span class="text-xl">📖</span>
                </div>
                <div class="flex-1">
                  <h4 class="font-medium text-gray-800">Reading Comprehension</h4>
                  <p class="text-xs text-gray-500">Literature & Analysis</p>
                </div>
                <button class="text-purple-600 text-sm font-medium">Learn</button>
              </div>
            </div>
            <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span class="text-xl">✍️</span>
                </div>
                <div class="flex-1">
                  <h4 class="font-medium text-gray-800">Creative Writing</h4>
                  <p class="text-xs text-gray-500">Essays & Stories</p>
                </div>
                <button class="text-purple-600 text-sm font-medium">Learn</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="maths-content" class="tab-content">
        <div class="space-y-4">
          <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-orange-600 mb-2">Maths That Clicks</h2>
            <p class="text-gray-600 text-sm">Interactive problem-solving tools</p>
          </div>
          
          <div class="space-y-3">
            <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span class="text-xl">📐</span>
                </div>
                <div class="flex-1">
                  <h4 class="font-medium text-gray-800">Geometry</h4>
                  <p class="text-xs text-gray-500">Shapes & Angles</p>
                </div>
                <button class="text-orange-600 text-sm font-medium">Practice</button>
              </div>
            </div>
            <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span class="text-xl">📊</span>
                </div>
                <div class="flex-1">
                  <h4 class="font-medium text-gray-800">Algebra</h4>
                  <p class="text-xs text-gray-500">Equations & Functions</p>
                </div>
                <button class="text-orange-600 text-sm font-medium">Practice</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="max-w-md mx-auto bg-white border-t border-gray-200 p-3">
    <div class="flex items-center justify-center space-x-2">
      <div class="w-2 h-2 bg-green-500 rounded-full"></div>
      <span class="text-xs text-gray-600">System Online</span>
    </div>
  </div>

  <script>
    function showTab(tabName) {
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
        button.classList.add('text-gray-600');
      });
      
      document.getElementById(tabName + '-content').classList.add('active');
      
      const activeButton = document.getElementById(tabName + '-tab');
      activeButton.classList.add('active');
      activeButton.classList.remove('text-gray-600');
    }
    
    document.addEventListener('DOMContentLoaded', function() {
      showTab('science');
    });
  </script>
</body>
</html>`);
});

const PORT = 5000;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});