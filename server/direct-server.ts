import express from 'express';
import { createServer } from 'http';
import path from 'path';

const app = express();
const server = createServer(app);

// Essential middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API routes
app.get('/api/grades', (req, res) => {
  res.json([
    { id: 1, number: 7, name: 'Grade 7', color: 'bg-blue-500' },
    { id: 2, number: 8, name: 'Grade 8', color: 'bg-green-500' },
    { id: 3, number: 9, name: 'Grade 9', color: 'bg-purple-500' },
    { id: 4, number: 10, name: 'Grade 10', color: 'bg-orange-500' },
    { id: 5, number: 11, name: 'Grade 11', color: 'bg-red-500' },
    { id: 6, number: 12, name: 'Grade 12', color: 'bg-yellow-500' }
  ]);
});

app.get('/api/topics', (req, res) => {
  res.json([
    { id: 1, name: 'Physics', gradeId: 1 },
    { id: 2, name: 'Chemistry', gradeId: 1 },
    { id: 3, name: 'Biology', gradeId: 1 }
  ]);
});

app.get('/api/experiments', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'Simple Circuit',
      description: 'Build a basic electrical circuit',
      duration: '30 minutes',
      imageUrl: '/images/circuit.jpg',
      topicId: 1,
      gradeId: 1,
      procedure: 'Connect wires to battery and bulb',
      curriculumAlignment: 'CAPS Physics Grade 7',
      learningOutcomes: 'Understanding basic electricity',
      extensionActivities: 'Try different configurations',
      safetyPrecautions: 'Handle wires carefully',
      createdAt: new Date().toISOString()
    }
  ]);
});

// Serve client files directly
app.use(express.static(path.join(process.cwd(), 'client')));

// SPA fallback - serve a working HTML page
app.get('*', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div class="bg-white rounded-lg shadow-lg p-6 text-center">
            <div class="text-3xl mb-4">🧪</div>
            <h3 class="text-xl font-semibold mb-2 text-green-600">Science Labs</h3>
            <p class="text-gray-600">Interactive experiments aligned with CAPS curriculum</p>
          </div>
          <div class="bg-white rounded-lg shadow-lg p-6 text-center">
            <div class="text-3xl mb-4">📚</div>
            <h3 class="text-xl font-semibold mb-2 text-purple-600">English</h3>
            <p class="text-gray-600">Language learning tools and resources</p>
          </div>
          <div class="bg-white rounded-lg shadow-lg p-6 text-center">
            <div class="text-3xl mb-4">🔢</div>
            <h3 class="text-xl font-semibold mb-2 text-orange-600">Mathematics</h3>
            <p class="text-gray-600">Problem-solving and mathematical concepts</p>
          </div>
        </div>
        <div class="text-center">
          <div class="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            System Online - Ready for Learning
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
});

const PORT = parseInt(process.env.PORT || '5000', 10);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Application ready at http://0.0.0.0:${PORT}`);
});

server.on('error', (err: any) => {
  console.error('Server error:', err);
  process.exit(1);
});