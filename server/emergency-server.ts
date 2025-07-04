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

// Basic API routes
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

// Serve static files from client/dist
const distPath = path.join(process.cwd(), 'client', 'dist');
app.use(express.static(distPath));

// Catch-all handler for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = parseInt(process.env.PORT || '5000', 10);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 EMERGENCY SERVER RUNNING ON PORT ${PORT}`);
  console.log(`🌐 Application ready at http://0.0.0.0:${PORT}`);
  console.log(`✅ Server is accepting connections`);
  console.log(`🔥 BYPASSING ALL COMPLEX INITIALIZATION`);
});

server.on('error', (err: any) => {
  console.error('❌ Emergency server error:', err);
  process.exit(1);
});

server.on('listening', () => {
  console.log(`🎯 Emergency server successfully bound to port ${PORT}`);
});