const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Inkwell Academy - WORKING</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-blue-50 p-8">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl font-bold text-blue-600 mb-4">Inkwell Academy Labs</h1>
        <p class="text-lg text-gray-700 mb-8">South African Multi-Subject Learning Platform</p>
        <div class="bg-green-100 p-4 rounded-lg">
          <p class="text-green-800 font-semibold">✅ Application is working properly!</p>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', time: new Date().toISOString() });
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Simple server running on port ${PORT}`);
  console.log(`Visit: http://0.0.0.0:${PORT}`);
});